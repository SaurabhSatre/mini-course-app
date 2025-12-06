require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Course = require('../models/Course');

const seedData = async () => {
    try {
        await connectDB();
        console.log('Connected to database');

        // Clear existing data (optional - comment out if you want to keep existing data)
        // await User.deleteMany({});
        // await Course.deleteMany({});
        // console.log('Cleared existing data');

        // Create dummy users
        const users = [
            {
                email: 'user1@example.com',
                password: 'password123',
                name: 'John Doe'
            },
            {
                email: 'user2@example.com',
                password: 'password123',
                name: 'Jane Smith'
            },
            {
                email: 'admin@example.com',
                password: 'admin123',
                name: 'Admin User'
            }
        ];

        for (const userData of users) {
            const existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const user = new User(userData);
                await user.save();
                console.log(`Created user: ${userData.email}`);
            } else {
                console.log(`User already exists: ${userData.email}`);
            }
        }

        // Create courses
        const courses = [
            {
                title: 'Introduction to React',
                description: 'Learn the fundamentals of React including components, props, state, and hooks. Perfect for beginners who want to start building modern web applications.',
                price: 0, // Free
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
            },
            {
                title: 'Advanced JavaScript',
                description: 'Master advanced JavaScript concepts including closures, promises, async/await, and design patterns. Take your JavaScript skills to the next level.',
                price: 49.99,
                image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800'
            },
            {
                title: 'Full Stack Development',
                description: 'Build complete full-stack applications using Node.js, Express, MongoDB, and React. Learn to create RESTful APIs and integrate frontend with backend.',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
            },
            {
                title: 'Python for Data Science',
                description: 'Learn Python programming for data analysis, visualization, and machine learning. Work with pandas, numpy, matplotlib, and scikit-learn.',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4f18cc5?w=800'
            },
            {
                title: 'UI/UX Design Fundamentals',
                description: 'Master the principles of user interface and user experience design. Learn to create beautiful, intuitive, and user-friendly designs.',
                price: 0, // Free
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800'
            },
            {
                title: 'DevOps and CI/CD',
                description: 'Learn DevOps practices, Docker, Kubernetes, and continuous integration/deployment. Automate your development workflow.',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800'
            }
        ];

        for (const courseData of courses) {
            const existingCourse = await Course.findOne({ title: courseData.title });
            if (!existingCourse) {
                const course = new Course(courseData);
                await course.save();
                console.log(`Created course: ${courseData.title} (${courseData.price === 0 ? 'Free' : '₹' + courseData.price})`);
            } else {
                console.log(`Course already exists: ${courseData.title}`);
            }
        }

        console.log('\n✅ Seed data created successfully!');
        console.log('\nDummy User Credentials:');
        console.log('1. Email: user1@example.com, Password: password123');
        console.log('2. Email: user2@example.com, Password: password123');
        console.log('3. Email: admin@example.com, Password: admin123');
        console.log('\nPromo Code for paid courses: BFSALE25 (50% discount)');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();

