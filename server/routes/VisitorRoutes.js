const express = require('express')
const GuardRouter = express.Router()
const { GetVisitorData } = require("../Controllers/VisitorController");

GuardRouter.get("/getData", GetVisitorData);


module.exports = GuardRouter;