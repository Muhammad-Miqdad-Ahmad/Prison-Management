const base = require("../Connections/Connections");

const DataExtract = async (req, res) => {
  res.status(200).json("okay the connection was yada");
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query =
    "SELECT * FROM chillarAdmins WHERE adminEmail = ? AND adminPassword = ?";
  try {
    // Execute the SQL query
    console.log("inside try");
    base.query(query, [email, password], (err, results) => {
      if (err) {
        console.error(err);
        res.status(404).json("AHHHHH fuck 😒\nHere we go again 🤦‍♂️");
      } else if (!results) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        res.status(200).json({ message: "Login successful", data: results });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const AddPrisoner = async (req, res) => {

}

module.exports = { DataExtract, AdminLogin, AddPrisoner };
