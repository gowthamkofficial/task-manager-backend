const { DataTypes } = require("sequelize");
const { sequelize } = require("../../configs/database");

let districts = sequelize.define("districts", {
  districtId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  district: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

let states = sequelize.define("states", {
  stateId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
});


module.exports = { districts, states }
