const express = require('express')
const cors = require('cors')
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
    app.use(async (req, res, next) => {
        if (!dbConnected) {
            try {
                await connectDB()
                dbConnected = true
            } catch (error) {
                console.error('Database connection error:', error)
            }
        }
        next()
    })
}

// Export for Vercel serverless
module.exports = app
