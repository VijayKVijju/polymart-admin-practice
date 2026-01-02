import express from "express";
import {
  createBuyerInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  getMyInquiries,
  getInquiryStats,
} from "../controllers/buyerInquiry.controller.js";

// Import your auth middleware
// import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Buyer routes (require authentication)
router.post("/", /* verifyJWT, */ createBuyerInquiry);
router.get("/my-inquiries", /* verifyJWT, */ getMyInquiries);

// Admin routes (require admin authentication)
router.get("/", /* verifyJWT, isAdmin, */ getAllInquiries);
router.get("/stats", /* verifyJWT, isAdmin, */ getInquiryStats);
router.get("/:id", /* verifyJWT, isAdmin, */ getInquiryById);
router.patch("/:id/status", /* verifyJWT, isAdmin, */ updateInquiryStatus);

export default router;