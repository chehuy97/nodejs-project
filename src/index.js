const express = require('express');
require('dotenv').config()
const database = require('./startup/database.startup');
const production = require('./startup/production.startup');

const app = express();

database()
production(app)

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log("Listening to port " + port)
})

console.log('ENV IS');
console.log(process.env);

module.exports = server