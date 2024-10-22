const express = require("express");
const GuardRouter = express.Router();
const { SomeFunction } = require("../Controllers/GuestController");

GuardRouter.get("/someFunction", SomeFunction);

module.exports = GuardRouter;
