const express = require("express");
const AdminRouter = express.Router();
const { DataExtract, AdminLogin, AddPrisoner } = require("../Controllers/AdminControllers");

AdminRouter.get("/getData", DataExtract);   
AdminRouter.post("/login", AdminLogin);     
AdminRouter.post("/addPrisoner", AddPrisoner);  

module.exports = AdminRouter;