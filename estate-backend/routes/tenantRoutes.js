const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const Property = require('../models/Property');
const Payment = require('../models/Payment');

// 1. GET ALL REGISTERED TENANTS (With Fresh Population)
router.get('/', async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('property').sort({ createdAt: -1 });
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tenants', error: error.message });
  }
});

// 2. REGISTER TENANT + AUTO GENERATE INVOICE (CRASH PROOF VERSION)
router.post('/', async (req, res) => {
  const { name, email, propertyId, leaseStart, leaseEnd, rentStatus } = req.body;
  
  try {
    // Generate secure dynamic occupant UID
    const uid = `OCC-${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    // Create and save new tenant schema instance
    const newTenant = new Tenant({
      uid, 
      name, 
      email, 
      property: propertyId || null, 
      leaseStart: leaseStart || 'N/A', 
      leaseEnd: leaseEnd || 'N/A', 
      rentStatus: rentStatus || 'PAID'
    });
    const savedTenant = await newTenant.save();

    // FIXED: Added { new: true } to make sure we fetch the updated state, and fallback pricing
    let propertyPrice = '₹0/mo';
    if (propertyId) {
      const targetProperty = await Property.findByIdAndUpdate(
        propertyId, 
        { status: 'RENTED' },
        { new: true } 
      );
      if (targetProperty && targetProperty.price) {
        propertyPrice = targetProperty.price;
      }
    }

    // AUTOMATION PIPELINE: Trigger independent invoice emission
    const invoiceId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const autoInvoice = new Payment({
      invoiceId,
      tenant: savedTenant._id,
      property: propertyId || null,
      amount: propertyPrice,
      dueDate: (leaseStart && leaseStart !== 'N/A') ? leaseStart : 'Immediate',
      status: rentStatus === 'PAID' ? 'PAID' : 'OVERDUE'
    });
    await autoInvoice.save();

    // Return the cleanly mapped tenant representation to the client view
    const populatedTenant = await Tenant.findById(savedTenant._id).populate('property');
    res.status(201).json(populatedTenant);

  } catch (error) {
    console.error("Critical Failure inside Tenant Registration Pipeline:", error.message);
    res.status(400).json({ message: 'Error registering tenant & invoice', error: error.message });
  }
});

module.exports = router;