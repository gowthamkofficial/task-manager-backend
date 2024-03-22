const { Op } = require("sequelize");
const { checkNull } = require("../../common/common");
const { Success, Failure } = require("../../common/response.model");
const { Tasks, SubTasks } = require("./tasks.model");
const Joi = require('joi');
const moment = require("moment");

/**List Task**/

async function getAllMainTasks(req, res) {
    try {
        let userId = req?.id;
        const main = await Tasks.findAll({ where: { userId: userId, status: { [Op.not]: 3 } } })
        res.status(200).json(new Success(200, 'Listed task successfully', main))

    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}

/**Create Task**/

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

/**Update Task**/

async function updateTask(req, res) {
    try {
        let userId = req.id;
        const { taskId, taskName, description, deletedId, subTasks } = req.body;

        if (deletedId?.length > 0) {
            deletedId.forEach(async ele => {
                let sub = await SubTasks.findByPk(ele);
                await sub.update({ status: 3 })
            });
        }

        const main = await Tasks.findByPk(taskId);
        (await main.update({ taskName, description })).dataValues

        let child
        if (subTasks?.length > 0) {
            child = subTasks.map(async ele => {
                if (checkNull(ele.id) && ele?.id != 0) {
                    let sub = await SubTasks.findByPk(ele?.id)
                    if (checkNull(sub.dataValues)) {
                        return (await sub.update(ele)).dataValues
                    }
                } else {
                    return (await SubTasks.create(ele)).dataValues
                }



            })
        }
        res.status(200).json(new Success(true, 'Updated task successfully'))


    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}


/**View Task**/

async function getOneTask(req, res) {
    try {
        const taskId = req.params.taskId;
        let main = await Tasks.findOne({ where: { id: taskId } });

        if (checkNull(main)) {
            let sub = await SubTasks.findAll({ where: { taskId: taskId, status: { [Op.not]: 3 } } });

            let data = {
                task: main, subtasks: sub
            }
            res.status(200).json(new Success(true, 'Task view successfully', data))
        } else {
            res.status(500).json(new Failure(`No task was found ${taskId}`))
        }

    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}


/**Delete Task**/

async function deleteTask(req, res) {

    try {
        const taskId = req.params.taskId;

        const task = await Tasks.findByPk(taskId);
        if (checkNull(task)) {
            await task.update({ status: 3 });

            const subTasks = (await SubTasks.findAll({ where: { taskId: taskId } })).forEach(async ele => {
                await ele.update({ status: 3 })
            });
            res.status(200).json(new Success(true, 'Deleted task successfully'))
        } else {
            res.status(500).json(new Failure('Task not found', error))
        }

    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}


/**Update Main and sub task status**/

async function updateStatus(req, res) {
    try {
        const taskId = req.query.taskId;
        const subTaskIds = JSON.parse(req.query.subTaskIds) ?? [];
        if (checkNull(taskId)) {
            const task = await Tasks.findByPk(taskId);
            console.log(task);
            if (checkNull(task)) {
                await task.update({ status: 2 });

                const subTasks = (await SubTasks.findAll({ where: { taskId: taskId } })).forEach(async ele => {
                    await ele.update({ status: 2 })
                });
                res.status(200).json(new Success(true, 'Completed task successfully'))
            } else {
                res.status(500).json(new Failure('Task not found', error))
            }
        } else {
            if (subTaskIds?.length > 0) {
                subTaskIds.forEach(async ele => {
                    const sub = await SubTasks.findByPk(ele);
                    if (sub) {
                        await sub.update({ status: 2 })
                    }
                })
                res.status(200).json(new Success(true, 'Completed task successfully'))
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(new Failure('Internal server error', error))
    }
}


/**Dashboard Piechart**/

class Dashboard {

    // card
    total
    completed
    pending
    deleted

    lineChart
    constructor(list, yearlyTasks) {

        this.total = list?.count ?? 0;
        this.completed = list?.rows?.filter(ele => ele?.status == 2).length ?? 0
        this.pending = list?.rows?.filter(ele => ele?.status == 0 || ele?.status == 1).length ?? 0
        this.deleted = list?.rows?.filter(ele => ele?.status == 3).length ?? 0
        this.lineChart = this.forLinechart(yearlyTasks)
    }

    forLinechart(data) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let line = {}
        for (let month of months) {
            line[month] = 0
        }
        data.map(ele => String(moment(ele?.createdAt).format('MMM'))).forEach((ele) => {
            line[ele] = line[ele] + 1
        })
        return line
    }
}

async function taskDashboard(req, res) {
    const currentYear = new Date().getFullYear();

    // Get the start date of the current year (e.g., January 1st)
    const startDateOfYear = new Date(`${currentYear}-01-01`)

    // Get the end date of the current year (e.g., December 31st)
    const endDateOfYear = new Date(`${currentYear}-12-31`)

    try {

        let userId = req?.id;

        const tasks = await Tasks.findAndCountAll({ where: { userId: userId } });

        const yearlyTasks = await Tasks.findAll({ where: { createdAt: { [Op.between]: [startDateOfYear, endDateOfYear] } } })

        res.status(200).json(new Success(true, 'Task details viewed successfully', new Dashboard(tasks, yearlyTasks)))


    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }


}


/*********************************JOI VALIDATIONS**************************************/

const subTasks = Joi.object().keys({
    subTaskName: Joi.string().min(3).messages({
        'any.required': 'Subtask name is required',
        'any.min': 'Subtask should have atleast 3 characters'
    }),
    priority: Joi.any().empty('').required().messages({
        'any.require': 'Priority is required'
    })
}).options({ presence: 'optional', allowUnknown: true })

const mainTasks = Joi.object().keys({
    taskName: Joi.string().min(3).messages({
        'any.required': 'Task name is required',
        'any.min': 'Task should have atleast 3 characters'
    }),
    description: Joi.string().min(25).messages({
        'any.required': 'Description is required',
        'any.min': 'Subtask should have atleast 25 characters'
    }),
    subTasks: Joi.array().required().items(subTasks).min(1).messages({
        'any.required': 'Subtask are required',
        'array.min': 'At least one subtask must be provided '
    })

}).options({ presence: 'optional', allowUnknown: true })


const updateStatusJoi = Joi.object().keys({
    taskId: Joi.any().required().messages({
        'any.required': 'Task Id key is missing'
    }),
    subTaskIds: Joi.any().required().messages({
        'array.required': 'Subtask id key is missing'
    })
})


module.exports = { createTask, getAllMainTasks, updateTask, getOneTask, deleteTask, updateStatus, taskDashboard, mainTasks, updateStatusJoi }