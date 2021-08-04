require('dotenv').config()

const environmentVariable = {
    PORT: process.env.PORT,
    DATABASE_CONNECTION: process.env.DATABASE_CONNECTION
}

module.exports =  environmentVariable