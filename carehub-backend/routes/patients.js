const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Get patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update patient
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;   // <-- CRUCIAL
