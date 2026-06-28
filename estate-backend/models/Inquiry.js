const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, default: 'Individual' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  requiredSpace: { type: String, required: true }, // e.g., 5000 sq ft / Office Space
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);