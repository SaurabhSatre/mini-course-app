const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Middleware to ensure database connection before handling requests
const ensureDBConnection = async (req, res, next) => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            return next();
        }

        // Try to connect
        await connectDB();
        
        // Double check connection state
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database connection not established');
        }

        next();
    } catch (error) {
        console.error('Database connection middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message
        });
    }
};

module.exports = ensureDBConnection;

