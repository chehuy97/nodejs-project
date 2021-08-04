const { InternalServerError } = require("../helpers/error.helpers")
const { logger } = require('../helpers/logging.helpers')

const error = (err, req, res) => {
   logger.error(err);
   console.log(err);
   return InternalServerError(res, err);
}

module.exports = error