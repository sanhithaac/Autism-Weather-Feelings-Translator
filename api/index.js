const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('../server/routes/auth');
const emotionRoutes = require('../server/routes/emotions');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emotions', emotionRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Database Connection
if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('undefined')) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB via Vercel'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.log('Running in DEMO MODE (No MongoDB URI found)');
}

module.exports = app;
