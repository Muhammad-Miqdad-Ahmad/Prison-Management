const base = require("../Connections/Connections");
const HttpStatusCodes = require("../Controllers/HttpRequests");

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
    base.query(query, [email], (err, results) => {
      if (err) {
        console.log("in if");
        console.error(err);
        res.status(HttpStatusCodes.NOT_FOUND).json({
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

const AddPrisoner = async (req, res) => {};

const GetAdminData = async (req, res) => {};

module.exports = { GetAdminData, AdminLogin, AddPrisoner };
