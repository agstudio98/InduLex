const mongoose = require('mongoose');

/**
 * @typedef {Object} Payment
 * @property {string} method - Payment method (e.g., 'Credit Card', 'Mercado Pago', 'Cash')
 * @property {string} details - Additional details or metadata about the transaction
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const paymentSchema = new mongoose.Schema({
    method: { type: String, required: true },
    details: { type: String }
}, { timestamps: true });

/**
 * Payment Model - Represents payment transaction records
 */
module.exports = mongoose.model('Payment', paymentSchema);