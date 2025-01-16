import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  education: { type: String, required: true },
  passOutYear: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  courseName: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpires: { type: Date, required: false },
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

export default User;
