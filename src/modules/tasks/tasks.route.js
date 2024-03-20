const express = require('express');
const { createTask, getAllMainTasks } = require('./tasks.controller');
const verifyToken = require('../../common/middlewares/authentication.middleware');

const taskRouter = express.Router();


taskRouter.get('/tasks', verifyToken, getAllMainTasks)
taskRouter.post('/task/create', verifyToken, createTask);


module.exports = taskRouter