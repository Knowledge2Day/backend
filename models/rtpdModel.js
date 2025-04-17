import mongoose from "mongoose";

const rtpdSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contact: { type: String },
    email: { type: String, required: true },
    country: { type: String, required: true },
    education: { type: String, required: true },
  },
  { timestamps: true }
);

const Rtpd = mongoose.model("Rtpd", rtpdSchema);

export default Rtpd;
