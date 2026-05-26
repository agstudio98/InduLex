/**
 * Wraps async functions to catch errors and forward them to the global error handler.
 * Eliminates the need for repetitive try/catch blocks in controllers.
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = asyncHandler;
