require('express-async-errors');
const { logger } = require('../helpers/logging.helpers')

export const logging = () => {
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message)
        logger.error(ex)
        console.log(ex)
        process.exit(1)

    });
    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message);
        logger.error(ex);
        console.log(ex);
        process.exit(1);
    });
}