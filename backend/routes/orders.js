const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @route POST /api/v1/orders
 * @desc Create a new order
 * @access Private
 */
router.post('/', orderController.createOrder);

module.exports = router;