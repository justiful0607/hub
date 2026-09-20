const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  spec: String,
  rating: Number,
  next: String,
  tone: String
});

module.exports = mongoose.model("Doctor", DoctorSchema);
