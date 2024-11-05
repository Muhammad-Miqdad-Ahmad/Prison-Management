const client = require("../Connections/Connections");
const HttpStatusCodes = require("../Controllers/HttpRequests");

const check = (req, res) => {
  const query = "SELECT * from thana";
  client.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "AHHHHH fuck 😒\nHere we go again 🤦‍♂️",
        data: err,
      });
    } else {
      console.log(results);
      return res
        .status(HttpStatusCodes.OK)
        .json({ message: "Login successful", data: results });
    }
  });
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Email and password are required", data: "" });
  }

  const query = "SELECT * FROM chillarAdmins WHERE adminEmail = ?";
  try {
    // Execute the SQL query
    client.query(query, [email], (err, results) => {
      if (err) {
        console.log("in if");
        console.error(err);
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: "AHHHHH fuck 😒\nHere we go again 🤦‍♂️",
          data: err,
        });
      } else if (!results || results.length === 0) {
        console.log("in else if");
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: "There aint no nigga with this fuck 🤮",
          data: results,
        });
      } else {
        console.log("in else");

        if (results[0].adminPassword === password) {
          return res
            .status(HttpStatusCodes.OK)
            .json({ message: "Login successful", data: results });
        } else {
          return res
            .status(HttpStatusCodes.UNAUTHORIZED)
            .json({ message: "Invalid password", data: "" });
        }
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const AddPrisoner = async (req, res) => {
  const {
    prisonerName,
    prisonerNumber,
    prisonerAge,
    prisonerGender,
    prisonerCrime,
    dateOfCapture,
    dateOfRelease,
    prisonerSentence,
  } = req.body;

  if (
    !prisonerName ||
    !prisonerNumber ||
    !prisonerNumber ||
    !prisonerAge ||
    Number.isNaN(prisonerAge) ||
    !prisonerGender ||
    !prisonerCrime ||
    !dateOfCapture ||
    // !dateOfRelease ||
    !prisonerSentence
  ) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json("Send me a the best nigga out there\nI cant work with this shit");
  }

  const values = [
    prisonerName,
    prisonerNumber,
    prisonerAge,
    prisonerGender,
    prisonerCrime,
    dateOfCapture,
    dateOfRelease,
    prisonerSentence,
  ];

  const query = `
    INSERT INTO Prisoners (
      prisoner_name,
      prisoner_number,
      prisoner_age,
      prisoner_gender,
      prisoner_crime,
      date_of_capture,
      date_of_release,
      prisoner_sentence
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  client.query(query, values, (err, result) => {
    if (err) {
      // Handle unique constraint violation specifically
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(HttpStatusCodes.CONFLICT) // 409 Conflict
          .json({
            message: "Conflict: thers is already a nigga with this name.",
            data: err,
          });
      }

      // General error handling for other errors
      console.error("Error inserting data:", err);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error inserting data", error: err });
    }

    // Handle cases where result may be undefined or empty
    if (!result || result.affectedRows === 0) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "No data inserted", data: result });
    }

    // Success response
    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "Data inserted successfully", data: result });
  });
};

const GetAdminData = async (req, res) => {
  const query = "SELECT * FROM chillarAdmins";
  try {
    // Execute the SQL query
    client.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(HttpStatusCodes.NOT_FOUND).json({
          message: "AHHHHH fuck 😒\nHere we go again 🤦‍♂️",
          data: err,
        });
      } else if (!results || results.length === 0) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: "There aint no nigga with this fuck 🤮",
          data: results,
        });
      } else {
        res
          .status(HttpStatusCodes.OK)
          .json({ message: "Login successful", data: results });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const UpdatePrisone = async (req, res) => {};

module.exports = { GetAdminData, AdminLogin, AddPrisoner, check };
