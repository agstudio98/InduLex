const mongoose = require('mongoose');

/**
 * @typedef {Object} OrderItem
 * @property {mongoose.Schema.Types.ObjectId} product - Reference to the Product
 * @property {number} quantity - Quantity of the product ordered
 */

/**
 * @typedef {Object} Order
 * @property {mongoose.Schema.Types.ObjectId} user - Reference to the User who placed the order
 * @property {OrderItem[]} products - Array of products in the order
 * @property {number} total - Total cost of the order
 * @property {mongoose.Schema.Types.ObjectId} payment - Reference to the Payment details
 * @property {mongoose.Schema.Types.ObjectId} branch - Reference to the Branch for pickup (optional)
 * @property {mongoose.Schema.Types.ObjectId} purchaseMode - Reference to the PurchaseMode (e.g., Delivery, Pickup)
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    purchaseMode: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseMode' }
}, { timestamps: true });

/**
 * Order Model - Represents a customer purchase transaction
 */
module.exports = mongoose.model('Order', orderSchema);