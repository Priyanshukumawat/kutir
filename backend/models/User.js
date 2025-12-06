const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
  role: {
    type: String,
    enum: ["user", "admin", "vendor"],
    default: "user",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
