const express = require("express");
const GuardRouter = express.Router();
const {
  GetVisitorData,
  GetPrisonerData,
  VisitingSlots,
  BookAppointment,
  GetAppointments,
} = require("../Controllers/VisitorController");

GuardRouter.get("/getData", GetVisitorData);
GuardRouter.get("/getPrisonerData", GetPrisonerData);
GuardRouter.get("/visitingSlots", VisitingSlots);
GuardRouter.post("/bookAppointment", BookAppointment);
GuardRouter.get("/appointments", GetAppointments);

module.exports = GuardRouter;
