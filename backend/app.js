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
app.use(cors());
app.use(express.json());

// 3. Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to InduLex API',
        version: '1.0.0',
        docs: '/api/v1/health'
    });
});

app.use('/api/v1', routes);

// 4. Global Error Handler (must be last)
app.use(errorHandler);

// 5. Start Server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
let server;
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, HOST, () => {
        logger.info(`Server running on http://${HOST}:${PORT}`);
    });
}

module.exports = app;

// 6. Graceful Shutdown
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
