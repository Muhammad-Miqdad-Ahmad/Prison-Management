async function generic_delete(
  res,
  table,
  attribute,
  value,
  client,
  HttpStatusCodes
) {
  try {
    // Delete the prisoner record by prisoner_id
    const result = await client.query(
      `DELETE FROM ${table} WHERE ${attribute} = $1 RETURNING *`,
      [value]
    );

    if (result.rowCount === 0) {
      // If no rows were affected, prisoner_id does not exist
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: `No data to show for ${value}`, data: result });
    }

    // Return success response with the deleted record
    res.status(HttpStatusCodes.OK).json({
      message: "Deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error deleting:", error);

    // Handle PostgreSQL-specific errors
    switch (error.code) {
      case "23503":
        return res.status(HttpStatusCodes.CONFLICT).json({
          message: "Cannot delete. Record is referenced in another table.",
          data: error,
        });
      case "42P01":
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: `Table ${table} does not exist in the database.`,
          data: error,
        });
      case "22P02":
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ message: "Invalid prisoner ID format.", data: error });
      default:
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "An unexpected error occurred while deleting the prisoner.",
          data: error,
        });
    }
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

  let query = `UPDATE ${table_name} SET `;
  if (check.length === 0)
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message: "Data missing" });

  check.map((field, index) => {
    if (index > 0) query += ", ";
    query += `${field} = $${index + 1}`;
  });

  query += ` WHERE ${where} = ${ID}`;

  return await client.query(query, fields, (error, results) => {
    if (error) {
      switch (error.code) {
        case "23505":
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: "Duplicate entry",
            data: error,
          });
        case "23502":
          return res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: "Not null violation",
            data: error,
          });
        default:
          return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error updating data",
            data: error,
          });
      }
    } else if (results?.rows?.length === 0)
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "No data to display", data: results });
    else
      return res
        .status(HttpStatusCodes.OK)
        .json({ message: "Data updated successfully", data: results });
  });
}

async function generic_add(
  res,
  query,
  requiredFields,
  client,
  HttpStatusCodes
) {
  try {
    const result = await client.query(query, requiredFields);

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
    switch (error.code) {
      case "23505":
        return res
          .status(HttpStatusCodes.CONFLICT)
          .json({ message: `Data already exists`, data: error });
      case "23502":
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          message: "One or more required fields are missing",
          data: error,
        });
      case "23503":
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          message: "Invalid prison ID",
          data: error,
        });
      default:
        console.error("Unexpected error:", error);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Could not create",
          data: error,
        });
    }
  }
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
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Could not create the required function in the database.",
          data: createError,
        });
      }
    }

    // Handle other PostgreSQL errors using `pgcodes`
    switch (error.code) {
      case "42P01": // Undefined table
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: `Table "${table}" does not exist in the database.`,
          data: error,
        });

      case "42703": // Undefined column
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          message: `Column "${attribute}" does not exist in table "${table}".`,
          data: error,
        });

      case "22P02": // Invalid input syntax
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          message: `Invalid value for column "${attribute}". Check input format.`,
          data: error,
        });

      case "42501": // Insufficient privilege
        return res.status(HttpStatusCodes.FORBIDDEN).json({
          message: `Permission denied for accessing table "${table}".`,
          data: error,
        });

      default:
        // For any other unexpected errors, return a generic internal server error
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "An unexpected error occurred while retrieving data.",
          data: error,
        });
    }
  }
}

function error_handler(res, HttpStatusCodes, error) {
  switch (error.code) {
    // Syntax error or access rule violation
    case "42601": // Syntax error
    case "42501": // Insufficient privilege
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Invalid SQL syntax or insufficient privileges",
        data: error,
      });
      break;

    // Integrity constraint violations
    case "23502": // Not null violation
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "A required field is missing",
        data: error,
      });
      break;
    case "23503": // Foreign key violation
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Foreign key constraint violated",
        data: error,
      });
      break;
    case "23505": // Unique violation
      res.status(HttpStatusCodes.CONFLICT).json({
        message: "Duplicate entry violates unique constraint",
        data: error,
      });
      break;

    // Check constraint violation
    case "23514": // Check constraint violation
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Check constraint violated",
        data: error,
      });
      break;

    // Invalid text representation
    case "22P02": // Invalid input syntax for type
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Invalid data format provided",
        data: error,
      });
      break;

    // Data type issues
    case "42804": // Data type mismatch
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Data type mismatch",
        data: error,
      });
      break;

    // Division by zero
    case "22012": // Division by zero
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Division by zero is not allowed",
        data: error,
      });
      break;

    // Numeric value out of range
    case "22003": // Numeric value out of range
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Numeric value is out of range",
        data: error,
      });
      break;

    // String length exceeded
    case "22001": // String data right truncation
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "String length exceeds the defined limit",
        data: error,
      });
      break;

    // Resource not found
    case "42P01": // Undefined table
      res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "Referenced table not found in the database",
        data: error,
      });
      break;

    // Service unavailable
    case "53300": // Too many connections
    case "57P03": // Cannot connect now
      res.status(HttpStatusCodes.SERVICE_UNAVAILABLE).json({
        message: "Database is currently unavailable",
        data: error,
      });
      break;

    // Generic server error
    default:
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An unexpected error occurred",
        data: error,
      });
      break;
  }
}

module.exports = { generic_delete, generic_update, generic_add, generic_get };
