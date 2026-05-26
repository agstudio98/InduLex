const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @route POST /api/v1/users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', userController.register);

/**
 * @route POST /api/v1/users/login
 * @desc Authenticate user and get token
 * @access Public
 */
router.post('/login', userController.login);

/**
 * @route POST /api/v1/users/google-login
 * @desc Authenticate user via Google OAuth
 * @access Public
 */
router.post('/google-login', userController.googleLogin);

/**
 * @route PATCH /api/v1/users/update/:id
 * @desc Update user profile details
 * @access Private
 */
router.patch('/update/:id', userController.updateUser);

module.exports = router;