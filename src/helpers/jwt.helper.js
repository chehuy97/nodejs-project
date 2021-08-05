const jwt = require('jsonwebtoken')

const generateToken = (user, secretSignature, tokenLife) => {
    console.log('TOKEN IS', secretSignature);
    return new Promise((resolve, reject) => {
        let userData = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        let token = jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            },
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })
}

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(decoded)
            }
        })
    })
}

module.exports = { generateToken, verifyToken}