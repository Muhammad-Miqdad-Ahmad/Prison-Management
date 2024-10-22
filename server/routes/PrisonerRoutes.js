const express = require('express')
const PrisonerRouter = express.Router()
const { SomeFunction } = require("../Controllers/PrisonerController");

GuardRouter.get("/someFunction", SomeFunction);


module.exports = PrisonerRouter;