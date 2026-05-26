const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @route GET /api/v1/products
 * @desc Get all products with optional filtering
 * @access Public
 */
router.get('/', productController.getProducts);

module.exports = router;