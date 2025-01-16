import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  passOutYear: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,  // This will store the course name
    required: true,
  },
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
