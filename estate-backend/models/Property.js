const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Residential, Commercial
  desc: { type: String, required: true },
  status: { type: String, enum: ['RENTED', 'VACANT'], default: 'VACANT' },
  img: { type: String, default: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
  price: { type: String, required: true }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Property', PropertySchema);