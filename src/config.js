require('dotenv').config()

const environmentVariable = {
    PORT: process.env.PORT,
    DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}

module.exports =  environmentVariable