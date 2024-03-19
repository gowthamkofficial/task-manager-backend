

const express = require('express');
const { getAllUsers, createUser, createUserJoi, checkDuplicateUser, updateUserJoi, checkDuplicateUserUpdate, updateUser } = require('./user.controller');
const userRouter = express.Router();
const middleware = require('../../common/middlewares/validation-middleware')



userRouter.get('/users', getAllUsers);

userRouter.post('/user/create', middleware(createUserJoi, 'body'), checkDuplicateUser, createUser);

userRouter.put('/user/update', middleware(updateUserJoi, 'body'), checkDuplicateUserUpdate, updateUser)

module.exports = userRouter 