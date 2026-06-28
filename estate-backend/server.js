const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuration (Isko sabse upar hona chahiye)
dotenv.config();

// Import Models for Seeding
const Property = require('./models/Property'); 

// Import Routes
const propertyRoutes = require('./routes/propertyRoutes');
const workOrderRoutes = require('./routes/workOrderRoutes');
const tenantRoutes = require('./routes/tenantRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes'); // Added: Auth Router Import

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Bind API Endpoints
app.use('/api/properties', propertyRoutes);
app.use('/api/workorders', workOrderRoutes);
app.use('/api/tenants', tenantRoutes); 
app.use('/api/payments', paymentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes); // Added: Linked Auth route matrix layer

// Test Route
app.get('/', (req, res) => {
  res.send('Premium Real Estate Enterprise API is Live...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('🛡️ MongoDB Database connected successfully.');
    
    try {
      const count = await Property.countDocuments();
      if (count === 0) {
        console.log('🌱 Database is empty! Injecting default premium properties...');
        const defaultListings = [
          { title: 'Sky Towers • Suite 4B', type: 'Residential Space', desc: '2 BHK Luxury Layout • Infinite Skyline View', status: 'RENTED', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', price: '₹45,000/mo' },
          { title: 'Lotus Meadows • Villa 05', type: 'Luxury Estate', desc: '4 BHK Premium Architecture • Private Pool', status: 'VACANT', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', price: '₹1,20,000/mo' },
          { title: 'Infinity Hub • Alpha 2', type: 'Commercial Tech Space', desc: 'Plug & Play Office • 50 Workstations Capacity', status: 'RENTED', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', price: '₹3,50,000/mo' },
          { title: 'The Pinnacle Penthouse', type: 'Elite Residential', desc: 'Duplex Layout • Private Helipad Access & Terrace Garden', status: 'VACANT', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', price: '₹2,80,000/mo' },
          { title: 'Nexus Plaza • Ground Retail', type: 'Commercial High-Street', desc: 'Double Height Glass Frontage • Heavy Footfall Area', status: 'RENTED', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', price: '₹1,95,000/mo' },
          { title: 'Elysian Studio • Bloc C', type: 'Smart Micro-Housing', desc: 'Fully Automated IoT Controls • Compact Minimalistic Interior', status: 'VACANT', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', price: '₹28,000/mo' }
        ];
        await Property.insertMany(defaultListings);
        console.log('✅ Default properties injected into MongoDB successfully!');
      }
    } catch (seedError) {
      console.error('⚠️ Seeding failed:', seedError.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server executing perfectly on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });