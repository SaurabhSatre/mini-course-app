const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const Course = require('../models/Course');

// POST /subscribe
router.post('/', auth, async (req, res) => {
    try {
        const { courseId, promoCode } = req.body;
        const userId = req.userId;

        // Validation
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: 'Course ID is required'
            });
        }

        // Find course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if already subscribed
        const existingSubscription = await Subscription.findOne({ userId, courseId });
        if (existingSubscription) {
            return res.status(400).json({
                success: false,
                message: 'You are already subscribed to this course'
            });
        }

        let pricePaid = course.price;

        // Handle free courses
        if (course.price === 0) {
            // Free course - allow instant subscription
            const subscription = new Subscription({
                userId,
                courseId,
                pricePaid: 0
            });

            await subscription.save();

            return res.status(201).json({
                success: true,
                message: 'Successfully subscribed to free course',
                subscription: {
                    id: subscription._id,
                    courseId: subscription.courseId,
                    pricePaid: 0,
                    subscribedAt: subscription.subscribedAt
                }
            });
        }

        // Handle paid courses
        if (!promoCode) {
            return res.status(400).json({
                success: false,
                message: 'Promo code is required for paid courses'
            });
        }

        // Validate promo code
        const validPromoCode = 'BFSALE25';
        if (promoCode !== validPromoCode) {
            return res.status(400).json({
                success: false,
                message: 'Invalid promo code'
            });
        }

        // Apply 50% discount
        pricePaid = course.price * 0.5;

        // Create subscription
        const subscription = new Subscription({
            userId,
            courseId,
            pricePaid
        });

        await subscription.save();

        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to course',
            subscription: {
                id: subscription._id,
                courseId: subscription.courseId,
                originalPrice: course.price,
                pricePaid: pricePaid,
                discount: 50,
                subscribedAt: subscription.subscribedAt
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You are already subscribed to this course'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error creating subscription',
            error: error.message
        });
    }
});

// GET /my-courses - return all courses the authenticated user subscribed to
router.get('/my-courses', auth, async (req, res) => {
    try {
        const userId = req.userId;

        const subscriptions = await Subscription.find({ userId })
            .populate('courseId', 'title description price image')
            .sort({ subscribedAt: -1 });

        const myCourses = subscriptions.map(sub => ({
            id: sub._id,
            course: sub.courseId,
            pricePaid: sub.pricePaid,
            subscribedAt: sub.subscribedAt
        }));

        res.json({
            success: true,
            count: myCourses.length,
            courses: myCourses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user courses',
            error: error.message
        });
    }
});

module.exports = router;

