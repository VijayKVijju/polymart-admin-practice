import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listings.controller.js";

const router = express.Router();

// Create & Get all listings
router.route("/")
  .post(createListing)
  .get(getAllListings);

// Get, Update, Delete single listing
router.route("/:id")
  .get(getListingById)
  .put(updateListing)
  .delete(deleteListing);

export default router;