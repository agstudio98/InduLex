const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const productRoutes = require('./products');
const orderRoutes = require('./orders');

/**
 * @route GET /api/v1/health
 * @desc Health check endpoint to verify API status
 * @access Public
 */
router.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'InduLex API is healthy and running.',
        timestamp: new Date().toISOString() 
    });
});

/**
 * User Resource Routes
 */
router.use('/users', userRoutes);

/**
 * Product Resource Routes
 */
router.use('/products', productRoutes);

/**
 * Order Resource Routes
 */
router.use('/orders', orderRoutes);

module.exports = router;
