

const express = require('express');
const { getAllUsers, createUser, createUserJoi, checkDuplicateUser, updateUserJoi, checkDuplicateUserUpdate, updateUser, viewUser } = require('./user.controller');
const userRouter = express.Router();
const middleware = require('../../common/middlewares/validation-middleware');
const verifyToken = require('../../common/middlewares/authentication.middleware');



userRouter.get('/users', verifyToken, getAllUsers);

userRouter.post('/user/create', verifyToken, middleware(createUserJoi, 'body'), checkDuplicateUser, createUser);

userRouter.put('/user/update', verifyToken, middleware(updateUserJoi, 'body'), checkDuplicateUserUpdate, updateUser)

userRouter.get('/user/view/:id', verifyToken, viewUser)

module.exports = userRouter 