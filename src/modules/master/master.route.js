const { getAllDistricts, getAllStates } = require("./master.controller");

const express = require("express");
const masterRouter = express.Router();

masterRouter.get("/states", getAllStates);
masterRouter.get("/districts/:stateId", getAllDistricts);

module.exports = masterRouter;
