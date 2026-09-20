const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
