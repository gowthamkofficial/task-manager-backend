const { Sequelize } = require('sequelize');



require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});


function connection() {

    sequelize.sync({ force: false }).then((res) => {
        console.log(res.getDatabaseName(), 'Connected database successfully.');
    }).catch(err => {
        console.log(err);
    })
}



module.exports = { sequelize, connection };