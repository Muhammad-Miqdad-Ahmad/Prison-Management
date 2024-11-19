const express = require("express");
const AdminRouter = express.Router();
const { GetAdminData, AdminLogin, AddPrisoner, check, buildQuery } = require("../Controllers/AdminControllers");

AdminRouter.get("/check", check);
AdminRouter.post("/login", AdminLogin);
AdminRouter.get("/buid", buildQuery);
// AdminRouter.get("/debounce", )
AdminRouter.get("/getData", GetAdminData);
AdminRouter.post("/addPrisoner", AddPrisoner);

module.exports = AdminRouter;