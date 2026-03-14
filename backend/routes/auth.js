const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// POST /api/auth/register - Seed admin if not exists
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    let user = await User.findOne({ email: 'admin@gmail.com' });
    if (!user) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      user = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      await user.save();
    }

    res.status(201).json({ message: 'Admin created/verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

