const express = require('express');
const { userSignIn, registerUser } = require('./session.controller');
const { checkDuplicateUser } = require('../users/user.controller');
const sessionRouter = express.Router();




sessionRouter.post('/signin', userSignIn)
sessionRouter.post('/register', checkDuplicateUser, registerUser)


module.exports = sessionRouter