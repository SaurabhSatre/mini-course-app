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

## 🎨 UI Features

- Clean and modern design with TailwindCSS
- Responsive layout (mobile, tablet, desktop)
- Loading states and skeletons
- Toast notifications for user feedback
- Smooth transitions and hover effects
- Protected routes with authentication

Mini Course Subscription App - Black Friday Edition

