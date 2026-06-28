const express = require('express');
const router = express.Router();
const path = require('path');

// Sahi path pointer automatic resolve karne ke liye
const User = require(path.join(__dirname, '../models/User'));

// REGISTER ENDPOINT
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check validation parameters
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are mandatory!' });
    }

    // Checking duplication in cluster
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered!' });
    }

    const newUser = new User({ 
      name, 
      email: email.toLowerCase(), 
      password, 
      role 
    });
    
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error("Registration Core Error:", error);
    return res.status(500).json({ message: 'Backend failed to save payload', error: error.message });
  }
});

// LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login execution failed', error: error.message });
  }
});

module.exports = router;