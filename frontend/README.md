# Mini Course Subscription App - Frontend

React frontend for the Mini Course Subscription Application built with TailwindCSS.

## Features

- ✅ Signup & Login with JWT authentication
- ✅ Home page with course listing
- ✅ Course detail page with subscription logic
- ✅ My Courses page (protected route)
- ✅ Toast notifications
- ✅ Responsive design with TailwindCSS
- ✅ Clean and modern UI

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

For production (Vercel), set this to your backend URL:
```env
REACT_APP_API_URL=https://your-backend.vercel.app
```

## Running Locally

```bash
npm start
```

The app will run on `http://localhost:3000`

## Pages

1. **Login/Signup** (`/login`) - Combined authentication page
2. **Home** (`/`) - Course listing page
3. **Course Detail** (`/course/:id`) - Course details with subscription
4. **My Courses** (`/my-courses`) - Protected route showing user's subscribed courses

## Features

### Authentication
- JWT token stored in localStorage
- Automatic token refresh
- Protected routes
- Auto-redirect on token expiration

### Course Subscription
- Free courses: Instant subscription
- Paid courses: Require promo code (BFSALE25) for 50% discount
- Mock payment system (no real payments)

### UI/UX
- TailwindCSS for styling
- Responsive design
- Loading states and skeletons
- Toast notifications for user feedback
- Smooth transitions and hover effects

## Dummy Credentials

After seeding the backend database:

1. Email: `user1@example.com`, Password: `password123`
2. Email: `user2@example.com`, Password: `password123`
3. Email: `admin@example.com`, Password: `admin123`

## Promo Code

- **BFSALE25** - Valid promo code for 50% discount on paid courses

## Deployment to Vercel

1. Install Vercel CLI:
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

4. Add Environment Variable in Vercel Dashboard:
   - Go to project settings
   - Navigate to "Environment Variables"
   - Add `REACT_APP_API_URL` with your backend URL

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Home.js
│   │   ├── CourseDetail.js
│   │   └── MyCourses.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── public/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Technologies Used

- React 19
- React Router DOM
- TailwindCSS
- Axios
- React Toastify
