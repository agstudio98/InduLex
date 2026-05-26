const Order = require('../models/Order');

/**
 * Service for order-related business logic.
 */
class OrderService {
    async createOrder(orderData) {
        const order = new Order(orderData);
        return await order.save();
    }

    async getOrdersByUser(userId) {
        return await Order.find({ user: userId }).sort({ createdAt: -1 });
    }
}

module.exports = new OrderService();
