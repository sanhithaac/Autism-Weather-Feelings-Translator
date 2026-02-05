const mongoose = require('mongoose');

const emotionLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emotion: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    intensity: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    note: {
        type: String,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('EmotionLog', emotionLogSchema);
