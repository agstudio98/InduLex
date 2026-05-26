const mongoose = require('mongoose');

/**
 * @typedef {Object} PurchaseMode
 * @property {string} mode - Mode of purchase (e.g., 'In-Store', 'Delivery', 'Pickup')
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const purchaseModeSchema = new mongoose.Schema({
    mode: { type: String, required: true }
}, { timestamps: true });

/**
 * PurchaseMode Model - Defines how a customer receives their order
 */
module.exports = mongoose.model('PurchaseMode', purchaseModeSchema);