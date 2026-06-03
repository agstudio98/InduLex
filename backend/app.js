require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middlewares
app.use(cors()); // Permite peticiones desde cualquier origen por defecto
app.use(express.json());

// 3. Health Checks (Mensajes para evitar el "Cannot GET")
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: '¡La API de Devvia está funcionando perfectamente en la raíz!' 
    });
});

app.get('/api', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: '¡Bienvenido a las rutas de la API de Devvia!' 
    });
});

// 4. Routes
app.use('/api', routes);

// 5. Global Error Handler (must be last)
app.use(errorHandler);

// 6. Start Server
const PORT = process.env.PORT || 5000;
let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, '0.0.0.0', () => {
        logger.info(`Server running on port ${PORT}`);
    });
}

module.exports = app;

// 7. Graceful Shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    if (server) {
        server.close(() => {
            logger.info('HTTP server closed');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

process.on('SIGINT', () => {
    logger.info('SIGINT signal received: closing HTTP server');
    if (server) {
        server.close(() => {
            logger.info('HTTP server closed');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION! Shutting down...', err.name, err.message);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});
