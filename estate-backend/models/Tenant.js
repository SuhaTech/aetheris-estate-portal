const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  uid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    trim: true 
  },
  // Relational Field: Property se link karne ke liye
  property: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Property', // Yeh aapke Property model ka naam hona chahiye
    default: null 
  },
  leaseStart: { 
    type: String, 
    default: 'N/A' 
  },
  leaseEnd: { 
    type: String, 
    default: 'N/A' 
  },
  rentStatus: { 
    type: String, 
    enum: ['PAID', 'OVERDUE'], 
    default: 'PAID' 
  }
}, { 
  timestamps: true // Isse createdAt aur updatedAt automatic ban jata hai
});

module.exports = mongoose.model('Tenant', TenantSchema);