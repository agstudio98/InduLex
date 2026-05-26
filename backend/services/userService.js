const User = require('../models/User');
const AppError = require('../utils/AppError');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Service for user-related business logic.
 */
class UserService {
    /**
     * Register a new user.
     */
    async registerUser(userData) {
        const { nombre, email, password } = userData;

        // Business logic validation
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('El correo ya está registrado.', 400);
        }

        const newUser = new User({ nombre, email, password });
        return await newUser.save();
    }

    /**
     * Authenticate a user.
     */
    async loginUser(email, password) {
        if (!email || !password) {
            throw new AppError('Por favor proporciona email y contraseña.', 400);
        }

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            throw new AppError('Credenciales inválidas.', 401);
        }

        return user;
    }

    /**
     * Google Login Logic
     */
    async loginWithGoogle(credential) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { email, name, picture, sub: googleId } = payload;

            // Find user or create new one
            let user = await User.findOne({ email });

            if (!user) {
                // Create user if doesn't exist
                user = new User({
                    nombre: name,
                    email: email,
                    // Google users don't have a local password by default
                    password: `google_${googleId}_${Math.random().toString(36).slice(-8)}`, 
                    imagen: picture
                });
                await user.save();
            }

            return user;
        } catch (error) {
            throw new AppError('Error al verificar el token de Google.', 401);
        }
    }

    /**
     * Update user profile data.
     */
    async updateUser(id, updateData) {
        const user = await User.findByIdAndUpdate(id, updateData, { 
            new: true, 
            runValidators: true 
        });

        if (!user) {
            throw new AppError('Usuario no encontrado.', 404);
        }

        return user;
    }
}

module.exports = new UserService();
