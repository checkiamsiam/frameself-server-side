const express = require('express')
const userRoute = require('./src/routes/users.route')
const routes = express.Router()

routes.use('/user' , userRoute)

module.exports = routes