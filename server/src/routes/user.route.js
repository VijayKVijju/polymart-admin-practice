import express from "express";
import {createContactMessage,getAllContactMessages} from "../controllers/user.controller.js";
const router = express.Router();

router.post(
  "/create-contact-support",
  // protect,
  createContactMessage,
);


router.get(
  "/get-contact-support",
  // protect,
  // authorizeRoles("Admin"),
  getAllContactMessages
);

export default router;