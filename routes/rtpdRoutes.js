import express from "express";
import {
  createRtpd,
  getAllRtpd,
  getRtpdById,
  updateRtpd,
  deleteRtpd,
} from "../controllers/rtpdController.js";

const router = express.Router();

// CREATE - Add a new RTPD registration
router.post("/", createRtpd);

// READ - Get all RTPD registrations
router.get("/all", getAllRtpd);

// READ - Get a single registration by ID
router.get("/:id", getRtpdById);

// UPDATE - Update a registration by ID
router.put("/:id", updateRtpd);

// DELETE - Delete a registration by ID
router.delete("/:id", deleteRtpd);

export default router;
