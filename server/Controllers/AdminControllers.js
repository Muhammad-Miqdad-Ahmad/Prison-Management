const client = require("../Connections/Connections");
const HttpStatusCodes = require("../Controllers/HttpRequests");

const buildQuery = (req, res) => {
  //? Its working
  const tableName = req.query.tableName;

  const query = `
  SELECT column_name 
  FROM information_schema.columns 
  WHERE table_name = $1
`;

  client.query(query, [tableName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "Some error",
        data: err,
      });
    } else {
      console.log(results);
      return res
        .status(HttpStatusCodes.OK)
        .json({ message: "Tables extracted successfully", data: results });
    }
  });
};

const check = (req, res) => {
  const query = "SELECT * from admins";
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
  const values = ({
    prisonID,
    FirstName,
    LastName,
    dateOfBirth,
    prisonerAge,
    prisonerNationality,
    prisonerGender,
    dateOfCapture,
    dateOfRelease,
    prisonerStatus,
    prisonerCrime,
    prisonerSentence,
    relative1,
    relative2,
    prisonerID,
  } = req.body);

  const requiredFields = [];

  for (const [key, value] of Object.entries(values)) {
    if (!value) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: `${key} is required and cannot be empty.` });
    } else requiredFields.push(value);
  }

  const query = `
    INSERT INTO Prisoner (
      prision_id, 
      person, 
      sentence_start_date, 
      sentence_end_date, 
      status,
      crime,
      sentence, 
      visitor_1, 
      visitor_2, 
      prisoner_id
    ) 
    VALUES(
    $1, 
    ROW($2, $3, $4, $5, $6, $7), 
    $8, $9, $10, $11, $12, $13, $14, $15
    );`;

  client.query(query, requiredFields, (err, result) => {
    if (err) {
      // Handle unique constraint violation specifically
      if (err.code === "23505") {
        return res
          .status(HttpStatusCodes.CONFLICT) // 409 Conflict
          .json({
            message: "Conflict: thers is already a nigga with this name.",
            data: err,
          });
      }

      // General error handling for other errors
      console.log(err);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error inserting data", data: err });
    }

    // Handle cases where result may be undefined or empty
    if (!result || result.affectedRows === 0) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "No data inserted", data: result });
    }

    // Success response
    return res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Data inserted successfully", data: result });
  });
};

const AddGuard = async (req, res) => {
  const values = ({
    guardID,
    prisonID,
    firstName,
    lastName,
    dateOfBirth,
    age,
    nationality,
    gender,
    joiningDate,
    shift,
    qrCode,
  } = req.body);

  const requiredFields = [];

  for (const [key, value] of Object.entries(values)) {
    if (!value) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: `${key} is required and cannot be empty.` });
    } else requiredFields.push(value);
  }

  const query = `
    INSERT INTO guards (
      guard_id, 
      prision_id, 
      person, 
      joining_date, 
      shift, 
      qr_code
    ) 
    VALUES (
      $1, 
      $2, 
      ROW($3, $4, $5, $6, $7, $8), 
      $9, 
      $10, 
      $11
    );
  `;

  client.query(query, requiredFields, (err, result) => {
    if (err) {
      // Handle unique constraint violation specifically
      if (err.code === "23505") {
        return res.status(HttpStatusCodes.CONFLICT).json({
          message: "Conflict: A guard with this ID or QR code already exists.",
          data: err,
        });
      }

      // General error handling for other errors
      console.error(err);
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error inserting data", data: err });
    }

    // Handle cases where result may be undefined or empty
    if (!result || result.rowCount === 0) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "No data inserted", data: result });
    }

    // Success response
    return res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "Guard data inserted successfully", data: result });
  });
};

const AddAdmin = async (req, res) => {
  const { admin_email, prision_id, admin_password } = req.body;

  const query = `INSERT INTO admins ( admin_email, prision_id, admin_password )
                 VALUES 
                 ($1, $2, $3);`;

  try {
    const result = await client.query(query, [
      admin_email,
      prision_id,
      admin_password,
    ]);
    return res.status(HttpStatusCodes.CREATED).json({
      message: "Admin added successfully",
      data: result,
    });
  } catch (error) {
    if (error?.detail == `Key (admin_email)=(${admin_email}) already exists.`) {
      res
        .status(HttpStatusCodes.CONFLICT)
        .json({ message: "This email already exists", data: error });
    } else
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not create admin", data: error });
  }
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

const debounceSearch = async (req, res) => {
  const tableName = req.query.tableName;
  const search = req.query.search;
  console.log("search:", search);
  console.log("tableName:", tableName);

  if (!tableName || !search) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Missing required query parameters: tableName or search",
    });
  }

  try {
    const columnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = $1
    `;

    const columnResult = await client.query(columnQuery, [tableName]);
    const columns = columnResult.rows
      .map((row) => row.column_name)
      .filter((column) => !column.toLowerCase().includes("password")); // Exclude columns containing "password"

    console.log(columns);

    if (columns.length === 0) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: `No columns found for table: ${tableName}`,
      });
    }

    let query = `SELECT * FROM ${tableName} WHERE `;
    const conditions = columns.map((column) => `${column}::text ILIKE $1`);
    query += conditions.join(" OR ");

    console.log(query);

    const searchValue = `%${search}%`;
    const result = await client.query(query, [searchValue]);

    console.log(searchValue);
    return res.status(HttpStatusCodes.OK).json({
      message: "Search completed successfully",
      data: result.rows,
    });
  } catch (err) {
    console.error("Error in debounceSearch:", err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error executing search",
      data: err,
    });
  }
};

const UpdatePrisoner = async (req, res) => {};

module.exports = {
  GetAdminData,
  AdminLogin,
  AddPrisoner,
  check,
  buildQuery,
  debounceSearch,
  AddAdmin,
  AddGuard,
};
