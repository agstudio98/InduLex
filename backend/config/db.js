const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connects to MongoDB with enhanced robustness.
 */
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        logger.error('CRITICAL: MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    const options = {
        serverSelectionTimeoutMS: 5000,
        autoIndex: true, // Build indexes
    };

    const connectWithRetry = async () => {
        try {
            logger.info(`Database: Attempting connection to MongoDB...`);
            await mongoose.connect(mongoUri, options);
        } catch (err) {
            logger.error(`Database: Connection failed. ${err.message}`);
            logger.info('Database: Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        }
    };

    // Connection Events
    mongoose.connection.on('connected', () => {
        logger.info('Database: Connection established successfully.');
    });

    mongoose.connection.on('error', (err) => {
        logger.error(`Database: Connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
        logger.warn('Database: Disconnected. Mongoose will attempt to reconnect automatically.');
    });

    // Start initial connection
    await connectWithRetry();
};

module.exports = connectDB;
