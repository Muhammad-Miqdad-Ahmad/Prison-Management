const client = require("../Connections/Connections"); // Ensure this correctly connects to your database
const HttpStatusCodes = require("../Controllers/HttpRequests"); // Ensure this file exists and is properly used (optional)

// Controller function
const GetVisitorData = async (req, res) => {
  const visitor_id = req.query.adminID; // Fetch visitor_id from the query parameters

  if (!visitor_id) {
    return res.status(400).json({ error: "visitor_id is required" });
  }

  try {
    // SQL query
    const query = `
        SELECT * 
        FROM Prisoner 
        WHERE visitor_1 = $1 OR visitor_2 = $1
      `;
    const values = [visitor_id]; // Using visitor_id once since it's reused in the query

    // Execute query
    const result = await client.query(query, values);

    // Send response
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching visitor data:", error.message);

    // Send error response
    res.status(500).json({
      error: "Internal server error",
      details: error.message, // Include the error details for debugging
    });
  }
};

module.exports = { GetVisitorData };
