const { checkNull, patterns } = require("../../common/common");
const userModel = require("./user.model");
const { Op } = require('sequelize');
const { Success, Failure } = require('../../common/response.model')
const joi = require("joi");
const { use } = require("./user.route");



async function getAllUsers(req, res) {

    try {
        const { limit, page, search, gender } = req.query;

        const paginate = checkNull(page) ? (page - 1) * limit : 0

        const data = await userModel.findAndCountAll({
            // where: {
            //     name: { [Op.like]: `%${search}%` },
            //     email: { [Op.like]: `%${search}%` },
            //     mobile: { [Op.like]: `%${search}%` },
            //     gender: gender,

            // },
            // offset: paginate,
            // limit: limit ?? 10
        })
        res.json(new Success(200, 'Listed users successfully', data, data.count))
    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}

async function createUser(req, res) {

    try {
        console.log(req.body)

        const { name, gender, mobile, password, email, dob } = req.body;

        const data = await userModel.create({ name, gender, mobile, password, email, dob });

        res.json(new Success(201, 'Created user successfully', data.dataValues))
    } catch (error) {
        res.status(500).json(new Failure(null, error))
    }
}

async function updateUser(req, res) {
    try {
        const data = await userModel.findByPk(req.body.id);
        if (data) {
            let value = {}
            for (let key in req.body) {
                if (checkNull(req.body[key])) {
                    value[key] = req.body[key]
                }
            }

            await data.update(value);
            res.json(new Success(200, 'Updated user successfully', { data: data.dataValues, value: value }))
        } else {
            res.json(new Failure('User not found'))
        }
    } catch (error) {
        res.status(500).json(new Failure('Internal server error', error))
    }
}


async function viewUser(req, res) {
    try {
        const data = await userModel.findByPk(req.params?.id);
        if (checkNull(data)) {
            res.status(200).json(new Success(200, 'User view successfully', data.dataValues))
        } else {
            res.status(500).json(new Success('User not found'))
        }
    } catch (error) {
        res.status(500).json(new Success('User not found', error))
    }
}


async function checkDuplicateUser(req, res, next) {

    const { email, mobile } = req.body;

    const existingMobile = await userModel.findOne({ where: { mobile } })

    const existingEmail = await userModel.findOne({ where: { email } })


    if (!checkNull(existingMobile)) {

        if (!checkNull(existingEmail)) {

            next()

        } else {
            res.status(500).json(new Failure('Email already exists'))
        }


    } else {
        res.status(500).json(new Failure('Mobile number already exists'))
    }
}


async function checkDuplicateUserUpdate(req, res, next) {

    const { email, mobile } = req.body;

    const existingMobile = await userModel.findOne({ where: { mobile } })

    const existingEmail = await userModel.findOne({ where: { email } })

    let { id } = req.body;

    const validForMobile = checkNull(existingMobile) ? id == existingMobile.dataValues.id : !checkNull(existingMobile);
    const validForEmail = checkNull(existingEmail) ? id == existingEmail.dataValues.id : !checkNull(existingEmail);




    if (validForMobile) {

        if (validForEmail) {

            next()

        } else {
            res.status(500).json(new Failure('Email already exists'))
        }


    } else {
        res.status(500).json(new Failure('Mobile number already exists', existingEmail.dataValues.id))
    }
}


const createUserJoi = joi.object().keys({
    name: joi.string().required().regex(patterns.removeWSWLetter).messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty",
        "string.pattern.base": "Name cannot contain white space.",
    }),
    email: joi.string().required().regex(patterns.emailPattern).messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty",
        "string.pattern.base": "Kindly provide a valid email",
    }),
    mobile: joi.string().required().regex(patterns.mobileNumber).messages({
        "any.required": "Mobile is required.",
        "string.empty": "Mobile cannot be empty",
        "string.pattern.base": "Kindly provide a valid mobile number",
    }),
    password: joi.string().required().min(8).messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty",
        "string.min": "Password should have atleast 8 characters",
    }),
    gender: joi.string().required().messages({
        "any.required": "Gender is required.",
        "string.empty": "Gender cannot be empty",
    }),
    dob: joi.string().required().messages({
        "any.required": "Date of birth is required.",
        "string.empty": "Date of birth cannot be empty",
    }),
})


const updateUserJoi = joi.object().keys({
    id: joi.required().messages({
        "any.required": "Id is required.",
        "string.empty": "Id cannot be empty",
    }),
    name: joi.string().required().regex(patterns.removeWSWLetter).messages({
        "any.required": "Name is required.",
        "string.empty": "Name cannot be empty",
        "string.pattern.base": "Name cannot contain white space.",
    }),
    email: joi.string().required().regex(patterns.emailPattern).messages({
        "any.required": "Email is required.",
        "string.empty": "Email cannot be empty",
        "string.pattern.base": "Kindly provide a valid email",
    }),
    mobile: joi.string().required().regex(patterns.mobileNumber).messages({
        "any.required": "Mobile is required.",
        "string.empty": "Mobile cannot be empty",
        "string.pattern.base": "Kindly provide a valid mobile number",
    }),
    password: joi.string().min(8).messages({
        "any.required": "Password is required.",
        "string.empty": "Password cannot be empty",
        "string.min": "Password should have atleast 8 characters",
    }),
    gender: joi.string().required().messages({
        "any.required": "Gender is required.",
        "string.empty": "Gender cannot be empty",
    }),
    dob: joi.string().required().messages({
        "any.required": "Date of birth is required.",
        "string.empty": "Date of birth cannot be empty",
    }),
})





module.exports = { getAllUsers, createUser, updateUser, viewUser, createUserJoi, updateUserJoi, checkDuplicateUser, checkDuplicateUserUpdate }