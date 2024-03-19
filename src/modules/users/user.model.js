const { DataTypes } = require("sequelize");
const { sequelize } = require("../../configs/database");



const userModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: DataTypes.STRING,
    dob: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = userModel