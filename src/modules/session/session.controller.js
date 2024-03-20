
const jwt = require('jsonwebtoken');
const userModel = require('../users/user.model')
const { checkNull } = require('../../common/common')
const { Success, Failure } = require('../../common/response.model')
const { Op } = require('sequelize');



async function userSignIn(req, res) {

    try {

        const { username, password } = req.body

        const data = await userModel.findOne({ where: { [Op.or]: [{ email: username }, { mobile: username }], } })

        if (checkNull(data.dataValues)) {

            if (data?.dataValues?.password == password) {

                let user = data.dataValues
                const token = jwt.sign({ id: user?.id, name: user?.name, mobile: user?.mobile, email: user?.email, dob: user?.bob, gender: user?.gender }, process.env.SECRET_KEY, { expiresIn: '24h' })
                res.status(200).json(new Success('Signed in successfully', { token: token }))
            } else {
                res.status(400).json(new Failure('Incorrect password', null))
            }



        } else {
            res.status(400).json(new Failure('User not found or Invalid user email address', null))
        }

    } catch (error) {
        res.status(500).json(new Failure('User not found or Invalid user email address', null))
    }
}


async function registerUser(req, res) {

    try {
        console.log(req.body)

        const { name, gender, mobile, password, email, dob } = req.body;

        const data = await userModel.create({ name, gender, mobile, password, email, dob });

        res.json(new Success(201, 'Registered user successfully', data.dataValues))
    } catch (error) {
        res.status(500).json(new Failure(null, error))
    }
}



module.exports = { userSignIn, registerUser }