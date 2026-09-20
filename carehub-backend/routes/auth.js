const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Patient registration
router.post("/register", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Patient login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email, password });
  if (!patient) return res.status(401).json({ error: "Invalid credentials" });
  res.json(patient);
});

module.exports = router;
