const express = require('express');
const EmotionLog = require('../models/EmotionLog');
const auth = require('../middleware/auth');
const router = express.Router();

// Log an emotion
router.post('/log', auth, async (req, res) => {
    try {
        const { emotion, weather, intensity, note } = req.body;
        const newLog = new EmotionLog({
            userId: req.user.id,
            emotion,
            weather,
            intensity,
            note
        });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get logs for the logged-in user (child)
router.get('/my-logs', auth, async (req, res) => {
    try {
        const logs = await EmotionLog.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get logs for a child (parent view) - Simplified for now
router.get('/child-logs/:childId', auth, async (req, res) => {
    try {
        // In a real app, we would verify if the requester is the parent of this child
        const logs = await EmotionLog.find({ userId: req.params.childId }).sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
