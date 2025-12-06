const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /courses - fetch all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
});

// POST /courses - create a new course
router.post('/', async (req, res) => {
    try {
        const { title, description, price, image } = req.body;

        // Validation
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        if (price === undefined || price < 0) {
            return res.status(400).json({
                success: false,
                message: 'Price must be a number >= 0'
            });
        }

        // Check if course with same title already exists
        const existingCourse = await Course.findOne({ title: title.trim() });
        if (existingCourse) {
            return res.status(400).json({
                success: false,
                message: 'Course with this title already exists'
            });
        }

        // Create new course
        const course = new Course({
            title: title.trim(),
            description: description.trim(),
            price: parseFloat(price) || 0,
            image: image || ''
        });

        await course.save();

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
});

// GET /courses/:id - fetch one course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            course
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error fetching course',
            error: error.message
        });
    }
});

module.exports = router;

