const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Public GET /api/courses (for frontend)
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons', 'title duration');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons', 'title duration videoUrl order');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

