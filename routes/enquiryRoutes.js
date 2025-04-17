import express from "express";
import {
    createEnquiry,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    deleteEnquiry
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/submit", createEnquiry);
router.get("/all", getAllEnquiries);
router.get("/:id", getEnquiryById);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

export default router;
