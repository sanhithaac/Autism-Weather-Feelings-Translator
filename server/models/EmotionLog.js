const mongoose = require("mongoose");

const EmotionLogSchema = new mongoose.Schema({
  weather: String,
  emotion: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EmotionLog", EmotionLogSchema);
