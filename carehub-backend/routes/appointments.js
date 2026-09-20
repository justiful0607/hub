const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Book appointment
router.post("/", async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.json(appointment);
});

// Get appointments for patient
router.get("/:patientId", async (req, res) => {
  const appointments = await Appointment.find({ patientId: req.params.patientId });
  res.json(appointments);
});

module.exports = router;
