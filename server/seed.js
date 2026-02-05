const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing demo users
        await User.deleteMany({ username: { $in: ['parent@cherry.com', 'Cherry'] } });

        // Create Parent
        const parent = new User({
            username: 'parent@cherry.com',
            password: 'Password123!',
            role: 'parent',
            childName: 'Cherry'
        });
        await parent.save();

        // Create Child
        const child = new User({
            username: 'Cherry',
            password: 'Password123!',
            role: 'child'
        });
        await child.save();

        console.log('Demo users created successfully!');
        console.log('--- PARENT ---');
        console.log('Username: parent@cherry.com');
        console.log('Password: Password123!');
        console.log('--- CHILD ---');
        console.log('Username: Cherry');
        console.log('Password: Password123!');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed();
