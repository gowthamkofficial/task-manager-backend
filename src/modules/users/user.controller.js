const { checkNull } = require("../../common/common");
const userModel = require("./user.model");





async function getAllUsers(req, res) {



    try {
        const { limit, page, search, userId, mobile, email, gender } = req.query;

        const paginate = checkNull(page) ? (page - 1) * limit ?? 0 : 0

        const data = await userModel.findAndCountAll({
            where: {
                name: { [Op.like]: `%${search}%` },
                email: { [Op.like]: `%${search}%` },
                mobile: { [Op.like]: `%${search}%` },
                gender: gender,
            },
            offset: paginate,
            limit : limit??10
        })
    } catch (error) {

    }
}