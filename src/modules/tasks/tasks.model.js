const { DataTypes } = require("sequelize");
const { sequelize } = require("../../configs/database");
const Tasks = sequelize.define('Tasks', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 1,
        allowNull: true
    }
})
const SubTasks = sequelize.define('SubTasks', {
    taskId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subTaskName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 1,
        allowNull: true
    }
})

module.exports = { Tasks, SubTasks }