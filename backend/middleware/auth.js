const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '') || 
                     req.headers['x-auth-token'] ||
                     req.cookies?.token;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided. Authentication required.' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found.' 
            });
        }

        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token.' 
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token expired.' 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: 'Authentication error.', 
            error: error.message 
        });
    }
};

module.exports = auth;

