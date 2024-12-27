const express = require("express");
const AdminRouter = express.Router();
const {
  GetAdminData,
  AdminLogin,
  AddPrisoner,
  check,
  buildQuery,
  debounceSearch,
  AddAdmin,
  AddGuard,
  DeletePrisoner,
  DeleteGuard,
  DeleteAdmin,
  UpdateAdmin,
  UpdateGuard,
  UpdatePrisoner,
  AddPrison,
  DeletePrison,
  addLog,
} = require("../Controllers/AdminControllers");

AdminRouter.get("/check", check);
AdminRouter.get("/buid", buildQuery);
AdminRouter.get("/getData", GetAdminData);
AdminRouter.get("/debounce", debounceSearch);

AdminRouter.post("/login", AdminLogin);
AdminRouter.post("/addAdmin", AddAdmin);
AdminRouter.post("/addGuard", AddGuard);
AdminRouter.post("/addPrisoner", AddPrisoner);
AdminRouter.post("/addPrison", AddPrison);
AdminRouter.post("/logs", addLog);

AdminRouter.put("/updateAdmin", UpdateAdmin);
AdminRouter.put("/updateGuard", UpdateGuard);
AdminRouter.put("/updatePrisoner", UpdatePrisoner);

AdminRouter.delete("/deleteAdmin", DeleteAdmin);
AdminRouter.delete("/deleteGuard", DeleteGuard);
AdminRouter.delete("/deletePrisoner", DeletePrisoner);
AdminRouter.delete("/deletePrison", DeletePrison);



module.exports = AdminRouter;
