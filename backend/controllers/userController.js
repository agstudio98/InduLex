const userService = require('../services/userService');
const { sendSuccess } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * Register a new user
 */
exports.register = asyncHandler(async (req, res, next) => {
    const { nombre, email, password } = req.body;

    // 1. Basic format validation (could be moved to a validation middleware later)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new AppError('Ingresa un correo electrónico válido.', 400));
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,12}$/;
    if (!password || !passRegex.test(password)) {
        return next(new AppError('La contraseña debe tener entre 7 y 12 caracteres, una mayúscula, un número y un carácter especial.', 400));
    }

    // 2. Business logic in service
    await userService.registerUser({ nombre, email, password });

    // 3. Response
    return sendSuccess(res, 201, 'Usuario registrado exitosamente.');
});

/**
 * Login user
 */
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    return sendSuccess(res, 200, 'Inicio de sesión exitoso.', {
        user: {
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            imagen: user.imagen,
            direccion: user.direccion,
            ciudad: user.ciudad,
            codigoPostal: user.codigoPostal
        }
    });
});

/**
 * Google Login
 */
exports.googleLogin = asyncHandler(async (req, res, next) => {
    const { credential } = req.body;
    
    if (!credential) {
        return next(new AppError('No se proporcionó la credencial de Google.', 400));
    }

    const user = await userService.loginWithGoogle(credential);

    return sendSuccess(res, 200, 'Inicio de sesión con Google exitoso.', {
        user: {
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            imagen: user.imagen
        }
    });
});

/**
 * Update User Profile
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!id || id === 'undefined') {
        return next(new AppError('No se proporcionó un ID de usuario válido.', 400));
    }

    const { nombre, direccion, ciudad, codigoPostal, imagen } = req.body;

    const user = await userService.updateUser(id, {
        nombre, direccion, ciudad, codigoPostal, imagen
    });

    return sendSuccess(res, 200, 'Perfil actualizado correctamente.', {
        user: {
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            imagen: user.imagen,
            direccion: user.direccion,
            ciudad: user.ciudad,
            codigoPostal: user.codigoPostal
        }
    });
});
