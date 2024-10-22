const express = require("express");
const AdminRouter = express.Router();
const { DataExtract } = require("../Controllers/AdminControllers");

AdminRouter.get("/extractData", DataExtract);

module.exports = AdminRouter;
