import mongoose from 'mongoose';

const liveDemoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpires: { type: Date },
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

export default mongoose.model('LiveDemo', liveDemoSchema);
