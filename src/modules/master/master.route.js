const verifyToken = require("../../common/middlewares/authentication.middleware");
const { getAllDistricts, getAllStates } = require("./master.controller");

const express = require("express");
const masterRouter = express.Router();

masterRouter.get("/states", verifyToken, getAllStates);
masterRouter.get("/districts/:stateId", verifyToken, getAllDistricts);

module.exports = masterRouter
