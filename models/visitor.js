import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: String,
  count: {
    type: Number,
    default: 0,
  },
  ips: {
    type: [String],
    default: [],
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
