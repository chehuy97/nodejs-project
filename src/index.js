const express = require('express');
const routes = require('./startup/routes.startup')
const database = require('./startup/database.startup');
const production = require('./startup/production.startup');
require('dotenv').config()

const app = express();

// database()
// production(app)
routes(app)

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log("Listening to port " + port)
})


module.exports = server