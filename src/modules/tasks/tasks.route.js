const express = require('express');
const { createTask, getAllMainTasks, updateTask, getOneTask, mainTasks, deleteTask, updateStatus, updateStatusJoi, taskDashboard } = require('./tasks.controller');
const verifyToken = require('../../common/middlewares/authentication.middleware');
const middleware = require('../../common/middlewares/validation-middleware');
const taskRouter = express.Router();


taskRouter.get('/tasks', verifyToken, getAllMainTasks)
taskRouter.post('/task/create', verifyToken, middleware(mainTasks, 'body'), createTask);
taskRouter.put('/task/update', verifyToken, middleware(mainTasks, 'body'), updateTask)
taskRouter.get('/task/view/:taskId', verifyToken, getOneTask);
taskRouter.post('/task/delete/:taskId', verifyToken, deleteTask);
taskRouter.put('/task/updateStatus', verifyToken, middleware(updateStatusJoi, 'query'), updateStatus);
taskRouter.get('/task/dashboard', verifyToken, taskDashboard)


module.exports = taskRouter