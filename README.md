# Mini Course Subscription Application (Black-Friday Edition)

A full-stack web application where users can sign up, view courses, and subscribe based on whether a course is free or paid. Built with React, Node.js, Express, MongoDB, and deployed on Vercel.

## 🚀 Features

- ✅ JWT Authentication (Signup & Login)
- ✅ Course Listing & Details
- ✅ Free & Paid Course Subscriptions
- ✅ Promo Code System (BFSALE25 - 50% discount)
- ✅ User Course Management
- ✅ Responsive Design with TailwindCSS
- ✅ Toast Notifications
- ✅ Mock Payment System (No real payments)

## 📋 Tech Stack

### Frontend
- React 19
- React Router DOM
- TailwindCSS
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Deployment
- Vercel (Frontend & Backend)

## 🏗️ Project Structure

```
mini-course-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── subscriptions.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── index.js
│   ├── vercel.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   ├── vercel.json
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:3000
   PORT=8080
   NODE_ENV=development
   ```

   **Important**: URL encode special characters in password:
   - `@` → `%40`
   - `#` → `%23`
   - `%` → `%25`

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 📱 Pages

### 1. Login/Signup Page (`/login`)
- Combined authentication page
- Form validation
- JWT token storage in localStorage
- Auto-redirect after login

### 2. Home Page (`/`)
- Displays all available courses
- Course cards with title, description, price, and thumbnail
- Links to course detail pages

### 3. Course Detail Page (`/course/:id`)
- Full course information
- **Free Courses**: Instant subscription button
- **Paid Courses**: 
  - Promo code input
  - Apply promo button
  - Subscribe button (disabled until promo validated)
  - Price display (original vs discounted)

### 4. My Courses Page (`/my-courses`)
- Protected route (requires authentication)
- Lists all subscribed courses
- Shows price paid and subscription date

## 🔐 Dummy User Credentials

After running `npm run seed` in the backend:

1. **User 1**: 
   - Email: `user1@example.com`
   - Password: `password123`

2. **User 2**: 
   - Email: `user2@example.com`
   - Password: `password123`

3. **Admin**: 
   - Email: `admin@example.com`
   - Password: `admin123`

## 🎟️ Promo Code

- **BFSALE25** - Valid promo code that gives 50% discount on paid courses

## 🌐 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user
- `POST /auth/login` - Login user

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID

### Subscriptions
- `POST /subscribe` - Subscribe to a course (requires auth)
- `GET /subscribe/my-courses` - Get user's courses (requires auth)

## 🚀 Deployment to Vercel

### Backend Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add Environment Variables in Vercel Dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL` (your frontend Vercel URL)
   - `NODE_ENV=production`

### Frontend Deployment

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add Environment Variable:
   - `REACT_APP_API_URL` (your backend Vercel URL)

## 📝 Important Notes

1. **MongoDB Password Encoding**: Special characters in MongoDB password must be URL-encoded in the connection string.

2. **Environment Variables**: Make sure to set all required environment variables in Vercel dashboard for both frontend and backend.

3. **CORS**: Backend is configured to accept requests from the frontend URL specified in `FRONTEND_URL`.

4. **Mock Payments**: All payments are mock-based. No real payment integration is required.

## 🎨 UI Features

- Clean and modern design with TailwindCSS
- Responsive layout (mobile, tablet, desktop)
- Loading states and skeletons
- Toast notifications for user feedback
- Smooth transitions and hover effects
- Protected routes with authentication

## 📄 License

ISC

## 👤 Author

Mini Course Subscription App - Black Friday Edition

---

**Note**: This is a mock application for demonstration purposes. No real payments are processed.

