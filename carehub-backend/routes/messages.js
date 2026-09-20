const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send message
router.post("/", async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for patient
router.get("/:patientId", async (req, res) => {
  try {
    const messages = await Message.find({
      patientId: req.params.patientId
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;