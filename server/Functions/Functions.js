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

module.exports = { generic_delete, generic_update, generic_add };
