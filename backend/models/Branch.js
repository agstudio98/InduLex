const mongoose = require('mongoose');

/**
 * @typedef {Object} Branch
 * @property {string} name - The name of the branch (e.g., 'Palermo Soho')
 * @property {string} location - The physical address or city of the branch
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }
}, { timestamps: true });

/**
 * Branch Model - Represents a physical store location
 */
module.exports = mongoose.model('Branch', branchSchema);