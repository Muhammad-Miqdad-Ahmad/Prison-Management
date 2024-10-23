const express = require('express')
const GuardRouter = express.Router()
const { SomeFunction } = require("../Controllers/VisitorController");

GuardRouter.get("/someFunction", SomeFunction);


module.exports = GuardRouter;