const express = require('express')
const PrisonerRouter = express.Router()
const { SomeFunction } = require("../Controllers/PrisonerController");

PrisonerRouter.get("/someFunction", SomeFunction);


module.exports = PrisonerRouter;