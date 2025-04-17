import Rtpd from "../models/rtpdModel.js";

// Create new registration
export const createRtpd = async (req, res) => {
  try {
    const rtpd = new Rtpd(req.body);
    const saved = await rtpd.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all registrations
export const getAllRtpd = async (req, res) => {
  try {
    const registrations = await Rtpd.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one registration
export const getRtpdById = async (req, res) => {
  try {
    const registration = await Rtpd.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update registration
export const updateRtpd = async (req, res) => {
  try {
    const updated = await Rtpd.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete registration
export const deleteRtpd = async (req, res) => {
  try {
    const deleted = await Rtpd.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
