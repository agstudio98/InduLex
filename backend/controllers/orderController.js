const orderService = require('../services/orderService');
const { sendSuccess } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * Create a new order
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
    if (!req.body.items || req.body.items.length === 0) {
        return next(new AppError('La orden debe contener al menos un producto.', 400));
    }

    const order = await orderService.createOrder(req.body);

    return sendSuccess(res, 201, 'Pedido creado exitosamente.', { order });
});
