const express = require('express')
const app = express()
const cors = require('cors')
const { connection } = require("./src/configs/database");
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const swagger = require('swagger-ui-express');

require('dotenv').config()

// Routes

const masterRouter = require('./src/modules/master/master.route');
const userRouter = require('./src/modules/users/user.route');





// Middlewares
app.use(express.json());
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


//  Database Connections
connection()


// Router

app.use('/', masterRouter);
app.use('/', userRouter)


app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument))

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})
