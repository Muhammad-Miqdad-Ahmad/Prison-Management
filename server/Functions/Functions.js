async function generic_delete(res, table, attribute, value, client, HttpStatusCodes) {
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
          return res
            .status(HttpStatusCodes.CONFLICT)
            .json({
              message:
                "Cannot delete. Record is referenced in another table.",
              data: error,
            });
        case "42P01":
          return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({
              message: `Table ${table} does not exist in the database.`,
              data: error,
            });
        case "22P02":
          return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: "Invalid prisoner ID format.", data: error });
        default:
          return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({
              message:
                "An unexpected error occurred while deleting the prisoner.",
              data: error,
            });
      }
    }
  }

  module.exports = {generic_delete}