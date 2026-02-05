const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, childName } = req.body;

        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, password, role, childName });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Login attempt: ${username}`);

        // --- DEMO BYPASS (Case Insensitive & Trimmed) ---
        const cleanUser = username ? username.trim().toLowerCase() : "";
        const cleanPass = password ? password.trim() : "";

        if (cleanPass === 'Password123!') {
            if (cleanUser === 'cherry') {
                console.log("Demo Child Bypass Triggered");
                const token = jwt.sign({ id: 'demo_child_id', role: 'child' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
                return res.json({ token, user: { id: 'demo_child_id', username: 'Cherry', role: 'child' } });
            }
            if (cleanUser === 'parent@cherry.com') {
                console.log("Demo Parent Bypass Triggered");
                const token = jwt.sign({ id: 'demo_parent_id', role: 'parent' }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
                return res.json({ token, user: { id: 'demo_parent_id', username: 'parent@cherry.com', role: 'parent', childName: 'Cherry' } });
            }
        }
        // -------------------

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
