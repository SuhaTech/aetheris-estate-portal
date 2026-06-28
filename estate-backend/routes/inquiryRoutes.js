const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// POST A NEW INQUIRY (100% RELAXED ACCEPTANCE)
router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, requiredSpace, message } = req.body;

    // Minimum check just for app sanity
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are mandatory fields.' });
    }

    const newInquiry = new Inquiry({
      name,
      company: company || 'Generic Portfolio',
      email,
      phone: phone || 'N/A', // Accepts any string format gracefully
      requiredSpace: requiredSpace || 'Standard Space',
      message: message || 'No Brief Provided'
    });

    const savedInquiry = await newInquiry.save();
    return res.status(201).json(savedInquiry);

  } catch (error) {
    console.error("Inquiry pipeline bypass error:", error.message);
    return res.status(500).json({ message: 'Database rejection exception', error: error.message });
  }
});

module.exports = router;