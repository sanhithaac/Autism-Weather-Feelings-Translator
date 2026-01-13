const router = require("express").Router();
const EmotionLog = require("../models/EmotionLog");

router.post("/", async (req, res) => {
  const log = new EmotionLog(req.body);
  await log.save();
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const logs = await EmotionLog.find().sort({ createdAt: -1 });
  res.json(logs);
});

module.exports = router;
