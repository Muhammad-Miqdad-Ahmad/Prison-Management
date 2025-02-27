const client = require("../Connections/Connections");
const HttpStatusCodes = require("../Controllers/HttpRequests");
const {
  generic_delete,
  generic_update,
  generic_add,
  generic_get,
} = require("../Functions/Functions");

const buildQuery = (req, res) => {
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
        message: "Just a message",
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

  const query = "SELECT * FROM admins WHERE admin_email = $1";
  try {
    const result = await client.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: "There is no Admin with these credentials 🤮",
        data: result.rows,
      });
    } else {
      const admin = result.rows[0];

      if (admin.admin_password === password) {
        return res
          .status(HttpStatusCodes.OK)
          .json({ message: "Login successful", data: admin });
      } else {
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid password", data: "" });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
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

  // // Explicitly cast `visitor_1`, `visitor_2`, and `prisoner_id` to NUMERIC
  const query = `
    INSERT INTO Prisoner (
      prision_id, 
      person, 
      sentence_start_date, 
      sentence_end_date, 
      prisoner_status,
      crime,
      sentence, 
      visitor_1, 
      visitor_2, 
      prisoner_id
    ) 
    VALUES(
      $1, 
      ROW($2, $3, $4, $5, $6, $7), 
      $8, $9, $10, $11, $12, 
      CAST($13 AS NUMERIC), 
      CAST($14 AS NUMERIC), 
      CAST($15 AS NUMERIC)
    );`;

  return generic_add(res, query, requiredFields, client, HttpStatusCodes);
};

const AddGuard = async (req, res) => {
  const values = ({
    guardID,
    prisonID,
    FirstName,
    LastName,
    dateOfBirth,
    Age,
    nationality,
    gender,
    joiningDate,
    guardShift,
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

  return generic_add(
    res,
    query,
    [
      guardID,
      prisonID,
      FirstName,
      LastName,
      dateOfBirth,
      Age,
      nationality,
      gender,
      joiningDate,
      guardShift,
      qrCode,
    ],
    client,
    HttpStatusCodes
  );
};

const AddAdmin = async (req, res) => {
  const { admin_email, prision_id, admin_password } = req.body;

  if (!admin_email || !prision_id || !admin_password) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message:
        "All fields (admin_email, prision_id, admin_password) are required.",
    });
  }

  const query = `INSERT INTO admins (admin_email, prision_id, admin_password)
                 VALUES ($1, $2, $3);`;

  const requiredFields = [admin_email, prision_id, admin_password];

  generic_add(res, query, requiredFields, client, HttpStatusCodes);
};

const AddPrison = async (req, res) => {
  const { prisonName, prisonLocation } = req.body;

  if (!prisonName || !prisonLocation) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "All fields (prisonName, prisonLocation) are required.",
    });
  }

  const query = `INSERT INTO prisions (prision_name, prision_location)
                    VALUES ($1, $2);`;

  const requiredFields = [prisonName, prisonLocation];
  generic_add(res, query, requiredFields, client, HttpStatusCodes);
};

const DeletePrisoner = async (req, res) => {
  console.log("in here");
  const ID = req.query.prisonerID;

  if (!ID) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Prisoner ID is required." });
  }
  return generic_delete(
    res,
    "prisoner",
    "prisoner_id",
    ID,
    client,
    HttpStatusCodes
  );
};

const DeleteGuard = async (req, res) => {
  const ID = req.query.guardID;

  if (!ID) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Guard ID is required." });
  }
  return generic_delete(res, "guards", "guard_id", ID, client, HttpStatusCodes);
};

const DeleteAdmin = async (req, res) => {
  const ID = req.query.adminID;

  if (!ID) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Admin ID is required." });
  }
  return generic_delete(res, "admins", "admin_id", ID, client, HttpStatusCodes);
};

const DeletePrison = async (req, res) => {
  const ID = req.query.prisonID;
  if (!ID) {
    return res

      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: "Prison ID is required." });
  }
  return generic_delete(
    res,
    "prisions",
    "prision_id",
    ID,
    client,
    HttpStatusCodes
  );
};

const UpdatePrisoner = async (req, res) => {
  const { FirstName, LastName, Age, gender, Crime, Sentence } = req.body;

  const requiredFields = {
    FirstName,
    LastName,
    Age,
    gender,
    Crime,
    Sentence,
  };

  return generic_update(
    res,
    "prisoner",
    "prisoner_id",
    req.body.prisonerID,
    requiredFields,
    client,
    HttpStatusCodes
  );
};

const UpdateGuard = async (req, res) => {
  const { FirstName, LastName, Age, gender, guardShift } = req.body;

  const requiredFields = {
    FirstName,
    LastName,
    Age,
    gender,
    guardShift,
  };

  return generic_update(
    res,
    "guards",
    "guard_id",
    req.body.guardID,
    requiredFields,
    client,
    HttpStatusCodes
  );
};

const UpdateAdmin = async (req, res) => {
  const { admin_password } = req.body;

  const requiredFields = { admin_password };

  return generic_update(
    res,
    "admins",
    "admin_id",
    req.body.adminID,
    requiredFields,
    client,
    HttpStatusCodes
  );
};

const GetAdminData = async (req, res) => {
  const admin_id = req.query.adminID;
  return generic_get(
    res,
    client,
    "admins",
    "admin_id",
    admin_id,
    HttpStatusCodes
  );
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

const addLog = async (req, res) => {
  console.log("in log");
  const { log, time } = req.body;
  if (!log || !time) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: "Missing required fields: log or time",
    });
  }
  console.log(log, time);
  const query = `INSERT INTO logs (log, time) VALUES ($1, $2);`;
  try {
    const result = await client.query(query, [log, time]);
    return res.status(HttpStatusCodes.CREATED).json({
      message: "Log added successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error adding log:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error adding log",
      data: error,
    });
  }
};

module.exports = {
  AdminLogin,
  AddPrisoner,
  AddAdmin,
  AddGuard,
  AddPrison,
  DeletePrisoner,
  DeleteGuard,
  DeleteAdmin,
  DeletePrison,
  UpdatePrisoner,
  UpdateGuard,
  UpdateAdmin,
  GetAdminData,
  check,
  buildQuery,
  debounceSearch,
  addLog
};
