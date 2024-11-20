const express = require("express");
const AdminRouter = express.Router();
const { GetAdminData, AdminLogin, AddPrisoner, check, buildQuery, debounceSearch } = require("../Controllers/AdminControllers");

AdminRouter.get("/check", check);
AdminRouter.get("/buid", buildQuery);
AdminRouter.post("/login", AdminLogin);
AdminRouter.get("/getData", GetAdminData);
AdminRouter.get("/debounce", debounceSearch);
AdminRouter.post("/addPrisoner", AddPrisoner);

module.exports = AdminRouter;