const express = require('express')
const userRoute = express.Router()

userRoute.get('/' , (req , res) => {
  res.send("welcome from user")
})

module.exports = userRoute