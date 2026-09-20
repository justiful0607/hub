const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  condition: String,
  doctor: String,
  diet: String,
  medications: [
    { name: String, dosage: String, refill: String, tone: String }
  ],
  reports: [
    { name: String, date: String, status: String, value: String }
  ]
});

module.exports = mongoose.model("Patient", PatientSchema);
