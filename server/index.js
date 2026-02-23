const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const emotionRoutes = require('./routes/emotions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emotions', emotionRoutes);

const startServer = () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Database Connection with local demo fallback
if (process.env.MONGO_URI && !process.env.MONGO_URI.includes('undefined')) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            startServer();
        })
        .catch(err => {
            console.error('MongoDB connection error, running in demo mode:', err.message);
            startServer();
        });
} else {
    console.log('No MONGO_URI found, running in demo mode');
    startServer();
}
