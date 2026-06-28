const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/WorkOrder');
const Tenant = require('../models/Tenant');

// 1. GET ALL TICKETS WITH LIVE RELATIONAL POPULATION
router.get('/', async (req, res) => {
  try {
    const orders = await WorkOrder.find()
      .populate('property')
      .populate('tenant') // Mapped to Tenant profile
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance records', error: error.message });
  }
});

// 2. CREATE WORK ORDER WITH AUTO-TENANT LINKING
router.post('/', async (req, res) => {
  const { propertyId, issue, priority, description } = req.body;
  
  try {
    // AUTOMATION: Find who currently occupies this property
    const activeOccupant = await Tenant.findOne({ property: propertyId });
    
    const ticketId = `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newOrder = new WorkOrder({
      ticketId,
      property: propertyId,
      tenant: activeOccupant ? activeOccupant._id : null, // Auto map tenant reference
      issue,
      priority,
      description,
      status: 'In Progress'
    });

    const savedOrder = await newOrder.save();
    
    const populatedOrder = await WorkOrder.findById(savedOrder._id)
      .populate('property')
      .populate('tenant');
      
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating maintenance ticket', error: error.message });
  }
});

module.exports = router;