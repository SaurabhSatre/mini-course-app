# Mini Course Subscription App - Backend

Backend API for the Mini Course Subscription Application built with Node.js, Express, and MongoDB.

## Features

- ✅ JWT Authentication (Signup & Login)
- ✅ Course Management (List & Details)
- ✅ Subscription System (Free & Paid with Promo Codes)
- ✅ User Course Tracking
- ✅ MongoDB Database
- ✅ Vercel Serverless Ready

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Connection (URL encode special characters in password)
# Example: If password is "Satre@123", use "Satre%40123"
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.vercel.app

# Port (optional, defaults to 8080)
PORT=8080

# Node Environment
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Running Locally

```bash
# Start the server
npm start

# Seed database with dummy data (users and courses)
npm run seed
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Create a new user account
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe" // optional
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  Returns: `{ success: true, token: "jwt-token", user: {...} }`

### Courses

- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID

### Subscriptions

- `POST /subscribe` - Subscribe to a course (requires authentication)
  ```json
  {
    "courseId": "course-id",
    "promoCode": "BFSALE25" // required for paid courses
  }
  ```

- `GET /subscribe/my-courses` - Get all courses user subscribed to (requires authentication)

## Dummy User Credentials

After running `npm run seed`, you can use these credentials:

1. Email: `user1@example.com`, Password: `password123`
2. Email: `user2@example.com`, Password: `password123`
3. Email: `admin@example.com`, Password: `admin123`

## Promo Code

- **BFSALE25** - Valid promo code that gives 50% discount on paid courses

## Deployment to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add Environment Variables in Vercel Dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from `.env` file:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `FRONTEND_URL`
     - `NODE_ENV=production`

5. The `vercel.json` file is already configured for serverless functions.

## Important Notes

- **Password Encoding**: If your MongoDB password contains special characters like `@`, `#`, `%`, etc., you must URL-encode them in the connection string:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`
  - `:` → `%3A`

- **Vercel Serverless**: The app automatically detects Vercel environment and handles database connections appropriately for serverless functions.

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── User.js            # User model
│   ├── Course.js          # Course model
│   └── Subscription.js    # Subscription model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── courses.js         # Course routes
│   └── subscriptions.js   # Subscription routes
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── scripts/
│   └── seedData.js        # Database seeding script
├── index.js               # Main server file
├── vercel.json            # Vercel configuration
└── package.json
```

