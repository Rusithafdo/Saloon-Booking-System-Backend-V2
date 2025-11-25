const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  serviceAvailability: { type: String, required: true },
  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salon",
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: { type: String },       // base64 string
  certificate: { type: String }, // base64 string
});

module.exports = mongoose.model("Professional", professionalSchema);
