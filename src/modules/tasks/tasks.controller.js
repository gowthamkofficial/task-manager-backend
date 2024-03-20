const { Success, Failure } = require("../../common/response.model");
const { Tasks, SubTasks } = require("./tasks.model");
const { use } = require("./tasks.route");



async function getAllMainTasks(req, res) {
    try {
        let userId = req?.id;
        const main = await Tasks.findAll({ where: { userId: userId } })
        res.status(200).json(new Success(200, 'Listed task successfully', main))

    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}

async function createTask(req, res) {
    try {
        const { taskName, description, subTasks } = req.body


        const main = await Tasks.create({ taskName, description, userId: req?.id });

        const sub = await subTasks.filter(async ele => {
            ele.taskId = await main.dataValues.id
            return (await SubTasks.create(ele)).dataValues
        })
        res.status(201).json(new Success('Created task successfully', { task: main.dataValues, subTasks: sub }))
    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}

module.exports = { createTask, getAllMainTasks }