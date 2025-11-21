// models/User.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  type: String,
  text: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photoURL: String,
  phone: String,
  gender: String,
  address: [addressSchema],
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);