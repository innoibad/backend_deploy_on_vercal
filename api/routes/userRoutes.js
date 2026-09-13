const express = require('express')
const { getUserController, updateUserController } = require('../controllers/usersController')


const usersRoute = express.Router()

usersRoute.get('/' , getUserController)
usersRoute.put('/' , updateUserController)


module.exports = {usersRoute}