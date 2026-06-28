const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// 1. GET ALL PROPERTIES FROM DATABASE
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
});

// 2. ADD A NEW PROPERTY TO DATABASE
router.post('/', async (req, res) => {
  const { title, type, desc, status, img, price } = req.body;
  try {
    const newProperty = new Property({ title, type, desc, status, img, price });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
});

module.exports = router;