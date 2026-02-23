const express = require('express');
const EmotionLog = require('../models/EmotionLog');
const auth = require('../middleware/auth');
const router = express.Router();

// Log an emotion
router.post('/log', auth, async (req, res) => {
    try {
        const { emotion, weather, intensity, note } = req.body;
        console.log(`Emotion log attempt for user: ${req.user.id}`);

        // --- DEMO BYPASS (No DB) ---
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('undefined') || req.user.id.includes('demo')) {
            console.log("Using Mock Log Save");
            return res.status(201).json({
                _id: 'mock_log_id',
                userId: req.user.id,
                emotion, weather, intensity, note,
                timestamp: new Date()
            });
        }
        // ---------------------------

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
        console.error("Log error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Get logs for the logged-in user (child)
router.get('/my-logs', auth, async (req, res) => {
    try {
        // --- DEMO BYPASS (No DB) ---
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('undefined') || req.user.id.includes('demo')) {
            console.log("Returning Mock Logs");
            return res.json([
                {
                    _id: 'mock_log_1',
                    userId: req.user.id,
                    emotion: 'Happy',
                    weather: 'Sunny',
                    note: 'Beautiful day!',
                    timestamp: new Date()
                }
            ]);
        }
        // ---------------------------

        const logs = await EmotionLog.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get logs for a child (parent view)
router.get('/child-logs/:childId', auth, async (req, res) => {
    try {
        // --- DEMO BYPASS (No DB) ---
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('undefined') || req.params.childId.includes('demo')) {
            return res.json([
                {
                    _id: 'mock_log_p1',
                    userId: req.params.childId,
                    emotion: 'Calm',
                    weather: 'Calm Cloud',
                    note: 'Feeling peaceful',
                    timestamp: new Date()
                }
            ]);
        }
        // ---------------------------

        const logs = await EmotionLog.find({ userId: req.params.childId }).sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
