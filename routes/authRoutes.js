const express = require('express')
const { signUpController, loginController } = require('../controllers/authController')

const authRoutes = express.Router()

authRoutes.post('/signUp' , signUpController )
authRoutes.post('/login' , loginController )


module.exports = authRoutes