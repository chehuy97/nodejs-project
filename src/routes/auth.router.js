const express = require('express')
const authRouter = express.Router()
const { login, refreshToken, registerAccount } = require('../controllers/auth.controller')

authRouter.route('/login').post(login)
authRouter.route('/refreshToken').post(refreshToken)
authRouter.route('/register').post(registerAccount)

module.exports = authRouter