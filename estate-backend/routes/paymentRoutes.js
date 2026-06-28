const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// GET ALL FINANCIAL INVOICES & LEDGERS
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('tenant')
      .populate('property')
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial ledgers', error: error.message });
  }
});

module.exports = router;