const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  unit: { type: String, required: true }, // Targeted property title
  category: { type: String, required: true }, // HVAC, Plumbing, etc.
  priority: { type: String, enum: ['Emergency', 'Urgent', 'High', 'Routine'], default: 'High' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Scheduled', 'Resolved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('WorkOrder', WorkOrderSchema);