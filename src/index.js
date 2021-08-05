const express = require('express');
const routes = require('./startup/routes.startup')
const database = require('./startup/database.startup');
const production = require('./startup/production.startup');
const logging = require('./startup/logging.startup')
var path = require('path');
var swagger_path =  path.resolve(__dirname,'./swagger.yaml');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(swagger_path);


require('dotenv').config()

const app = express();

logging()
database()
production(app)

app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

routes(app)

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log("Listening to port " + port)
})


module.exports = server