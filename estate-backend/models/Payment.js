const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true }, // e.g., INV-2026-8921
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  amount: { type: String, required: true }, // e.g., ₹4,50,000/mo
  dueDate: { type: String, required: true },
  status: { type: String, enum: ['PAID', 'PENDING', 'OVERDUE'], default: 'PAID' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);