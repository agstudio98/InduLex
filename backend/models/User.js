const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {string} nombre - Full name of the user
 * @property {string} email - Unique email address of the user
 * @property {string} password - Hashed password of the user
 * @property {string} [imagen] - URL or path to user profile image
 * @property {string} [direccion] - Shipping address
 * @property {string} [ciudad] - City of residence
 * @property {string} [codigoPostal] - Postal code
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imagen: { type: String },
    direccion: { type: String },
    ciudad: { type: String },
    codigoPostal: { type: String }
}, { timestamps: true });

/**
 * User Model - Represents a customer account
 */
module.exports = mongoose.model('User', userSchema);
