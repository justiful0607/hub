const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  slot: String,
  status: { type: String, default: "Booked" }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
