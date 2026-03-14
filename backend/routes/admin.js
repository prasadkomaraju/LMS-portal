const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const router = express.Router();

// Courses CRUD - Admin only
// GET /api/admin/courses
router.get('/courses', auth, admin, async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/courses
router.post('/courses', auth, admin, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/admin/courses/:id
router.get('/courses/:id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lessons');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/courses/:id
router.put('/courses/:id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('lessons');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/admin/courses/:id
router.delete('/courses/:id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    // Delete associated lessons
    await Lesson.deleteMany({ course: req.params.id });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Lessons CRUD - Admin only
// GET /api/admin/lessons
router.get('/lessons', auth, admin, async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('course', 'title');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/lessons
router.post('/lessons', auth, admin, async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    // Add to course lessons array
    await Course.findByIdAndUpdate(lesson.course, { $addToSet: { lessons: lesson._id } });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/admin/lessons/:id
router.get('/lessons/:id', auth, admin, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course', 'title');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/admin/lessons/:id
router.put('/lessons/:id', auth, admin, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('course', 'title');
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/admin/lessons/:id
router.delete('/lessons/:id', auth, admin, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    // Remove from course lessons array
    await Course.findByIdAndUpdate(lesson.course, { $pull: { lessons: lesson._id } });
    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

