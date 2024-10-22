const mySQL = require("mysql2");
require("dotenv").config();

const base = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

module.exports = base