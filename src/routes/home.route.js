const express = require('express')
const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
    res.send('<h1>Welcome to home.<h1>')
})


module.exports = homeRouter