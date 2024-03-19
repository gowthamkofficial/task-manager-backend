const { Failure, Success } = require("../../common/response.model");
const { districts, states } = require("./master.model");

async function getAllStates(req, res) {
  try {
    const data = await states.findAll();
    res.json(new Success(200, "Listed states successfully", data));
  } catch (error) {
    res.json(new Failure(500, error));
  }
}

async function getAllDistricts(req, res) {
  try {
    let id = req.params.stateId;
    const data = await districts.findAll({ where: { stateId: id } });
    res.json(new Success(200, "Listed districts successfully", data));
  } catch (error) {
    res.json(new Failure(500, error));
  }
}

module.exports = { getAllDistricts, getAllStates }
