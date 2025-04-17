import Enquiry from "../models/enquiryModel.js";

// CREATE
export const createEnquiry = async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json({ message: "Enquiry submitted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ALL
export const getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ SINGLE
export const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ error: "Enquiry not found" });
        res.json(enquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE
export const updateEnquiry = async (req, res) => {
    try {
        const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: "Enquiry not found" });
        res.json({ message: "Enquiry updated successfully", updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE
export const deleteEnquiry = async (req, res) => {
    try {
        const deleted = await Enquiry.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Enquiry not found" });
        res.json({ message: "Enquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
