const mongoose = require("mongoose");

// Cache the connection to avoid multiple connections in serverless environments
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        // If already connected, return the existing connection
        if (cached.conn) {
            return cached.conn;
        }

        // If connection is in progress, wait for it
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };

            cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log('✅ MongoDB Connected Successfully!');
                    console.log(`   Database: ${mongoose.connection.name}`);
                }
                return mongoose;
            });
        }

        cached.conn = await cached.promise;
        return cached.conn;
        
    } catch (error) { 
        cached.promise = null;
        console.error('❌ MongoDB Connection Error:', error.message);
        throw error; // Re-throw to let caller handle it
    }
};

module.exports = connectDB;