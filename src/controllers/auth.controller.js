const User = require('../model/user')
const mongoose = require('mongoose')
const { generateToken, verifyToken } = require('../helpers/jwt.helper')
const { NotFound, SuccessResponse, BadRequest } = require('../helpers/error.helpers')

const ACCESS_TOKEN_LIFE = '2h'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'cewa.niceToSeeYou.2021'
const REFRESH_TOKEN_LIFE = '3650d'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'chehuy.secret.1997'

const login = async (req, res) => {
    console.log('TRY TO LOGIN');
    try {
        let loginInfo = req.body
        let user = await User.findOne({
            $and: [
                { email: { $eq: loginInfo.email } },
                { password: { $eq: loginInfo.password } }
            ]
        }).exec()
        console.log("user is ", user);
        if (user) {
            let accessToken = await generateToken(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE)
            let refreshToken = await generateToken(user, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE)
            let userId = user.id
            SuccessResponse(res, { userId, accessToken, refreshToken })
        } else {
            NotFound(res, 'Wrong username or password')
        }
    } catch (err) {
        BadRequest(res, err)
    }
}

const refreshToken = async (req, res) => {
    let token = res.body.accessToken
    if (token) {
        try {
            let decoded = await verifyToken(token, REFRESH_TOKEN_SECRET)
            let user = decoded.data
            let newAccesstoken = await generateToken(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE)
            SuccessResponse(res, { newAccesstoken })
        } catch (err) {
            BadRequest(res, 'Wrong refresh token.')
        }
    } else {
        NotFound(res, 'Not found refesh token')
    }
}

const registerAccount = async (req, res) => {
    try {
        const userRequest = req.body
        let userExist = await User.findOne({ email: userRequest.email}).exec()
        if (!userExist) {
            let user = new User(userRequest)
            const result = await user.save()
            SuccessResponse(res, result, 201)
        } else {
            BadRequest(res, 'Account is existed')
        }
    } catch (err) {
        BadRequest(res, "Cannot register")
    }
}

module.exports = { login, refreshToken, registerAccount}