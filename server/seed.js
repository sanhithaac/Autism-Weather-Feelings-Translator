const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Check if parent already exists
        const existingParent = await User.findOne({ username: 'parent@example.com' });
        if (existingParent) {
            console.log('Parent user already exists!');
            process.exit(0);
        }

        const parent = new User({
            username: 'parent@example.com',
            password: 'Password123!', // Remember the requirements for strong pass in UI if any
            role: 'parent',
            childName: 'Sunny'
        });

        await parent.save();
        console.log('Parent user created successfully!');
        console.log('Username: parent@example.com');
        console.log('Password: Password123!');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed();
