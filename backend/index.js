const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = require('./config/db')
const app = express()

// CORS configuration - allow Vercel frontend URL or localhost
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000'
].filter(Boolean)

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true)
        } else {
            callback(null, true) // Allow all origins for now, restrict in production
        }
    },
    credentials: true
}))
app.use(express.json())

const PORT = process.env.PORT || 8080

// Health check endpoint
app.get('/', (request, response) => {
    response.json({
        message: "Server running",
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    })
})

// API Routes
app.use('/auth', require('./routes/auth'))
app.use('/courses', require('./routes/courses'))
app.use('/subscribe', require('./routes/subscriptions'))

// Connect to database and start server (only in non-serverless environments)
if (process.env.VERCEL !== '1') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`)
        })
    }).catch((error) => {
        console.error("❌ Failed to start server:", error.message)
        process.exit(1)
    })
} else {
    // For Vercel serverless, connect on first request
    let dbConnected = false
    let dbConnecting = false
    
    app.use(async (req, res, next) => {
        // Skip connection check for health check endpoint
        if (req.path === '/') {
            return next();
        }
        
        if (!dbConnected && !dbConnecting) {
            dbConnecting = true
            try {
                await connectDB()
                dbConnected = true
                dbConnecting = false
            } catch (error) {
                dbConnecting = false
                console.error('Database connection error:', error)
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed',
                    error: error.message
                })
            }
        } else if (dbConnecting) {
            // Wait for connection to complete
            while (dbConnecting) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }
        
        // Ensure connection is ready before proceeding
        if (mongoose.connection.readyState !== 1) {
            try {
                await connectDB()
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed',
                    error: error.message
                })
            }
        }
        
        next()
    })
}

// Export for Vercel serverless
module.exports = app
