const { verifyToken } = require('../helpers/jwt.helper')
const { Unauthorized, NotFound } = require('../helpers/error.helpers')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'cewa.niceToSeeYou.2021'

const isAuth = async (req, res, next) => {
    let tokenFromClient = req.body.token || req.query.token || req.headers['access-token']

    if (tokenFromClient) {
        try {
            let stringList = tokenFromClient.split(" ")
            if (stringList[0].toLowerCase() == "bearer") {
                let realToken = stringList[1]
                const decoded = await verifyToken(realToken, accessTokenSecret)
                req.params.jwtDecoded = decoded
                next()
            } else {
                Unauthorized(res, "Wrong token format", 401)
            }

        } catch (err) {
            Unauthorized(res, "Unauthorized", 401)
        }
    } else {
        NotFound(res, 'Token not found', 404)
    }
}

module.exports = { isAuth }