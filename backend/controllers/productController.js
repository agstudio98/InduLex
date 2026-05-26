const productService = require('../services/productService');
const { sendSuccess } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Get all products with pagination and filters
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
    const { page, limit, category, search } = req.query;
    
    const result = await productService.getProducts({ page, limit, category, search });
    
    return sendSuccess(res, 200, 'Productos obtenidos exitosamente.', result);
});
