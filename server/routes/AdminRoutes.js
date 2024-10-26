const express = require("express");
const AdminRouter = express.Router();
const { GetAdminData, AdminLogin, AddPrisoner } = require("../Controllers/AdminControllers");

AdminRouter.get("/getData", GetAdminData);   
AdminRouter.post("/login", AdminLogin);     
AdminRouter.post("/addPrisoner", AddPrisoner);  

module.exports = AdminRouter;