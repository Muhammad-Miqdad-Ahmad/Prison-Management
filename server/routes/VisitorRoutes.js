const express = require('express')
const VisitorRouter = express.Router()
const { SomeFunction } = require("../Controllers/VisitorController");

GuardRouter.get("/someFunction", SomeFunction);


module.exports = VisitorRouter;