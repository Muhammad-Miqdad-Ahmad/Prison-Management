const { text } = require("express");

function createField(params) {
  switch (params) {
    case "Age":
      return "person.age"
    case "FirstName":
      return "person.first_name"
    case "LastName":
      return "person.last_name"
    case "gender":
      return "person.gender"
    default:
      return params
  }
}

async function generic_delete(
  res,
  table,
  attribute,
  value,
  client,
  HttpStatusCodes
) {
  try {
    // Delete the record by the provided attribute and value
    const result = await client.query(
      `DELETE FROM ${table} WHERE ${attribute} = $1 RETURNING *`,
      [value]
    );

    if (result.rowCount === 0) {
      // If no rows were affected, the record does not exist
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: `No data to show for ${value}`, data: result });
    }

    // Return success response with the deleted record
    const resultlog = await client.query(
      `INSERT INTO logs (log, time) VALUES ($1, $2) RETURNING *`,
      [`Deleted ${table} where ${attribute} = ${value}`, new Date()]
    );
    return res.status(HttpStatusCodes.OK).json({
      message: "Deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting:", error);

    // Delegate error handling to the centralized error handler
    return error_handler(res, HttpStatusCodes, error);
  }
}

async function generic_update(
  res,
  table_name,
  where,
  ID,
  requiredFields,
  client,
  HttpStatusCodes
) {

  if (!ID) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "ID is required." });
  }

  const check = [];
  const fields = [];

  for (const key in requiredFields) {
    if (requiredFields[key]) {
      check.push(key);
      fields.push(requiredFields[key]);
    }
  }

  if (check.length === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Data missing" });
  }

  let query = `UPDATE ${table_name} SET `;
  check.map((field, index) => {
    if (index > 0) query += ", ";
    query += `${createField(field)} = $${index + 1}`;
  });
  query += ` WHERE ${where} = ${ID}`;

  console.log(query);

  try {
    const result = await client.query(query, fields);

    if (result?.rowCount === 0) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "No data to display", data: result });
    }

    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Data updated successfully", data: result });
  } catch (error) {
    console.error("Error updating data:", error);

    // Delegate error handling to the centralized error handler
    return error_handler(res, HttpStatusCodes, error);
  }
}

async function generic_add(
  res,
  query,
  requiredFields,
  client,
  HttpStatusCodes
) {
  try {
    console.log("Sending query");
    const result = await client.query({
      text: query,
      values: requiredFields,
      statement_timeout: 5000,
    });
    console.log("Got results");

    if (result.rowCount === 0) {
      return res.status(HttpStatusCodes.NO_CONTENT).json({
        message: "No rows were affected. Please verify your input.",
      });
    }

    return res.status(HttpStatusCodes.CREATED).json({
      message: "Created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Sad");
    console.log(error);
    return error_handler(res, HttpStatusCodes, error);
  }
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "And unexpected" });
}

async function generic_get(
  res,
  client,
  table,
  attribute,
  value,
  HttpStatusCodes
) {
  try {
    // Check if input values are provided
    if (!table || !attribute || !value) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Missing required parameters: table, attribute, or value.",
      });
    }

    // Build the query for calling the database function
    const query = `SELECT * FROM get_filtered_data_json($1, $2, $3)`;
    const result = await client.query(query, [table, attribute, value]);

    // If query executes successfully, return the result
    return res.status(HttpStatusCodes.OK).json({
      message: "Data fetched successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Check if the error is because the function does not exist
    if (error.code === "42883") {
      // PostgreSQL error code for "undefined function"
      console.log(
        "Function get_filtered_data_json does not exist. Creating it..."
      );

      // Create the missing function
      const createFunctionQuery = `
        CREATE OR REPLACE FUNCTION get_filtered_data_json(
          table_name TEXT,
          column_name TEXT,
          filter_value TEXT
        )
        RETURNS SETOF JSON AS $$
        BEGIN
          RETURN QUERY EXECUTE format(
            'SELECT row_to_json(t) FROM (SELECT * FROM %I WHERE %I = %L) t',
            table_name,
            column_name,
            filter_value
          );
        END;
        $$ LANGUAGE plpgsql;
      `;

      try {
        // Execute the query to create the function
        await client.query(createFunctionQuery);
        console.log("Function get_filtered_data_json created successfully.");

        // Retry the original query
        const retryResult = await client.query(query, [
          table,
          attribute,
          value,
        ]);
        return res.status(HttpStatusCodes.OK).json({
          message: "Data fetched successfully after creating function.",
          data: retryResult,
        });
      } catch (createError) {
        console.error(
          "Error creating function get_filtered_data_json:",
          createError
        );
        // Use error handler for errors during function creation
        return error_handler(res, HttpStatusCodes, createError);
      }
    }

    // For all other errors, use the error handler
    return error_handler(res, HttpStatusCodes, error);
  }
}

function error_handler(res, HttpStatusCodes, error) {
  switch (error.code) {
    // Syntax error or access rule violation
    case "42601": // Syntax error
    case "42501": // Insufficient privilege
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Invalid SQL syntax or insufficient privileges",
        data: error,
      });
      break;

    // Integrity constraint violations
    case "23502": // Not null violation
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "A required field is missing",
        data: error,
      });
      break;
    case "23503": // Foreign key violation
      console.log("Foreign key constrain error");
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Foreign key constraint violated",
        data: error,
      });
      break;
    case "23505": // Unique violation
      console.log("unique key violation");
      return res.status(HttpStatusCodes.CONFLICT).json({
        message: "Duplicate entry violates unique constraint",
        data: error,
      });
      break;

    // Check constraint violation
    case "23514": // Check constraint violation
      console.log("Check constrain violated");
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Check constraint violated",
        data: error,
      });
      break;

    // Invalid text representation
    case "22P02": // Invalid input syntax for type
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Invalid data format provided",
        data: error,
      });
      break;

    // Data type issues
    case "42804": // Data type mismatch
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Data type mismatch",
        data: error,
      });
      break;

    // Division by zero
    case "22012": // Division by zero
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Division by zero is not allowed",
        data: error,
      });
      break;

    // Numeric value out of range
    case "22003": // Numeric value out of range
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Numeric value is out of range",
        data: error,
      });
      break;

    // String length exceeded
    case "22001": // String data right truncation
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "String length exceeds the defined limit",
        data: error,
      });
      break;

    // Resource not found
    case "42P01": // Undefined table
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "Referenced table not found in the database",
        data: error,
      });
      break;

    // Service unavailable
    case "53300": // Too many connections
    case "57P03": // Cannot connect now
      return res.status(HttpStatusCodes.SERVICE_UNAVAILABLE).json({
        message: "Database is currently unavailable",
        data: error,
      });
      break;

    // Generic server error
    default:
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
        data: error,
      });
      break;
  }
}

module.exports = {
  generic_delete,
  generic_update,
  generic_add,
  generic_get,
  error_handler,
};
