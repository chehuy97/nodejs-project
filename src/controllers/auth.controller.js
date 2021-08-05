const User = require('../model/user')
const { generateToken, verifyToken } = require('../helpers/jwt.helper')
const { NotFound, SuccessResponse, BadRequest } = require('../helpers/error.helpers')
const environmentVariable = require('../config')
const { encrypt } = require('../libs/authentication')

const ACCESS_TOKEN_LIFE = '2h'
const ACCESS_TOKEN_SECRET = environmentVariable.ACCESS_TOKEN_SECRET || 'cewahuy.niceToSeeYou.2021'
const REFRESH_TOKEN_LIFE = '3650d'
const REFRESH_TOKEN_SECRET = environmentVariable.REFRESH_TOKEN_SECRET || 'cewahuy.secrect.1234'

const login = async (req, res) => {
    try {
        let {email, password} = req.body
        encryptPassword = encrypt(password)
        console.log('ENCRYPT PASSWORD IS ', encryptPassword);
        let user = await User.findOne({
            $and: [
                { email: { $eq: email } },
                { password: { $eq: encryptPassword } }
            ]
        }).exec()
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
    let token = req.body.refreshToken
    if (token) {
        try {
            let decoded = await verifyToken(token, REFRESH_TOKEN_SECRET)
            let user = decoded.data
            let newAccesstoken = await generateToken(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE)
            SuccessResponse(res, { newAccesstoken })
            console.log('Success Refesh Token');
        } catch (err) {
            BadRequest(res, 'Wrong refresh token.')
        }
    } else {
        console.log('Not Found Refesh Token');
        NotFound(res, 'Not found refesh token')
    }
}

const registerAccount = async (req, res) => {
    try {
        let { password, ...userRequest} = req.body
        let userExist = await User.findOne({ email: userRequest.email}).exec()
        if (!userExist) {
            userRequest.password = encrypt(password)
            console.log('REGISTER ENCRYPT PASSWORD IS', userRequest.password);
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