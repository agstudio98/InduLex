const logger = require('../utils/logger');

/**
 * Global Error Handling Middleware
 * Catches all errors and sends a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
    // Handling Mongoose CastErrors (like invalid ObjectIds)
    if (err.name === 'CastError') {
        err.message = `Valor inválido ${err.value} para el campo ${err.path}`;
        err.statusCode = 400;
        err.status = 'fail';
        err.isOperational = true;
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log the error for internal tracking (No emojis allowed)
    logger.error(`API ERROR: ${err.status.toUpperCase()} (${err.statusCode}): ${err.message}`, err.stack);

    // Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    // Programming or other unknown error: don't leak error details to client
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error. Please contact support.'
    });
};

module.exports = errorHandler;
