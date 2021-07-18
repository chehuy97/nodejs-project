
const { InternalServerError } = require("../helpers/error.helpers")
const { logger } = require('../helpers/logging.helpers')

export const error = (err, req, res) => {
   logger.error(err);
   console.log(err);
   return InternalServerError(res, err);
}