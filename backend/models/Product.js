const mongoose = require('mongoose');

/**
 * @typedef {Object} Product
 * @property {string} nombre - Name of the product
 * @property {number} precio - Price of the product
 * @property {string} categoria - Category of the product (e.g., 'Hoodies', 'Shoes')
 * @property {string} descripcion - Detailed description of the product
 * @property {string} imagen - URL or path to the product image
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true }
}, { timestamps: true });

/**
 * Product Model - Represents an item in the catalog
 */
module.exports = mongoose.model('Product', productSchema);