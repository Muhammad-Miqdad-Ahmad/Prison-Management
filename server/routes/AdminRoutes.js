const express = require("express");
const AdminRouter = express.Router();
const { DataExtract, AdminLogin } = require("../Controllers/AdminControllers");

AdminRouter.get("/getData", DataExtract);
AdminRouter.post("/login", AdminLogin);

module.exports = AdminRouter;