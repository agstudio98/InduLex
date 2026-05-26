/**
 * Standardized API response handler.
 * Ensures consistent response structure across the entire application.
 */

/**
 * Send a success response.
 * @param {Response} res Express response object
 * @param {number} statusCode HTTP status code
 * @param {string} message Success message
 * @param {any} data Optional data to return
 */
exports.sendSuccess = (res, statusCode, message, data = null) => {
    const response = {
        status: 'success',
        message,
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Send an error response (for operational errors).
 * Usually called by the global error handler, but can be used directly if needed.
 */
exports.sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: 'fail',
        message,
    });
};
