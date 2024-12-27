const client = require("../Connections/Connections"); // Ensure this correctly connects to your database
const HttpStatusCodes = require("../Controllers/HttpRequests"); // Ensure this file exists and is properly used (optional)

// Controller function
const GetVisitorData = async (req, res) => {
  const visitor_id = req.query.visitorId; // Fetch visitor_id from the query parameters

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
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No data found" });
    }
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

const GetPrisonerData = async (req, res) => {
  const visitorId = req.query.visitorId;
  try {
    const result = await client.query(
      `SELECT * FROM Prisoner WHERE visitor_1 = $1 OR visitor_2 = $1`,
      [visitorId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No data found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching prisoners:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const VisitingSlots = async (req, res) => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = daysOfWeek.indexOf(daysOfWeek[today.getDay()]);
    const nextSevenDays = daysOfWeek.slice(currentDayIndex).concat(daysOfWeek.slice(0, currentDayIndex));

    const result = await client.query(
      `SELECT vs.*, vd.day_of_week, vd.start_time, vd.end_time
       FROM visitingSlots vs
       JOIN visitingDetails vd ON vs.visiting_id = vd.visiting_id
       WHERE vd.day_of_week = ANY(\$1)`,
      [nextSevenDays]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching visiting slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


};

const BookAppointment = async (req, res) => {
  const { prisoner_id, slot_id, visitor_id } = req.body;

  try {
    // Check if the slot is available
    const slotResult = await client.query(
      "SELECT * FROM visitingSlots WHERE slot_id = $1 AND current_visitor < capacity",
      [slot_id]
    );

    if (slotResult.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Slot is not available" });
    }

    // Check if the visitor is associated with the prisoner
    const prisonerResult = await client.query(
      "SELECT * FROM Prisoner WHERE prisoner_id = $1 AND (visitor_1 = $2 OR visitor_2 = $2)",
      [prisoner_id, visitor_id]
    );

    if (prisonerResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Visitor is not associated with this prisoner",
      });
    }

    // Insert the reservation
    await client.query(
      "INSERT INTO visitingReservations (slot_id, prisoner_id, visitor_id, reservation_time, visit_date) VALUES ($1, $2, $3, NOW(), CURRENT_DATE)",
      [slot_id, prisoner_id, visitor_id]
    );

    // Update the current visitor count
    await client.query(
      "UPDATE visitingSlots SET current_visitor = current_visitor + 1 WHERE slot_id = $1",
      [slot_id]
    );

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const GetAppointments = async (req, res) => {
  const visitorId = req.query.visitorId;
  if (!visitorId) {
    return res.status(400).json({ error: "visitor_id is required" });
  }
  try {
    const result = await client.query(
      `SELECT vr.*, p.person, s.slot_time
       FROM visitingReservations vr
       JOIN Prisoner p ON vr.prisoner_id = p.prisoner_id
       JOIN visitingSlots s ON vr.slot_id = s.slot_id
       WHERE vr.visitor_id = $1`,
      [visitorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  GetVisitorData,
  GetPrisonerData,
  VisitingSlots,
  BookAppointment,
  GetAppointments
};
