//PROPERLY WORKING CODE
/*

import Listing from "../models/listing.model.js";

/**
 * @desc    Create a new listing
 * @route   POST /api/listings
 * @access  Public / Protected (based on auth later)
 
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all listings
 * @route   GET /api/listings
 * @access  Public
 
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single listing by ID
 * @route   GET /api/listings/:id
 * @access  Public
 
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Listing ID",
    });
  }
};

/**
 * @desc    Update listing
 * @route   PUT /api/listings/:id
 * @access  Protected (later)
 
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete listing
 * @route   DELETE /api/listings/:id
 * @access  Protected (later)
 
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
*/
//--------------------------------------new implement----------------------

import mongoose from "mongoose";
import Listing from "../models/listing.model.js";

/**
 * @desc    Create a new listing
 * @route   POST /api/listings
 * @access  Public / Protected (later)
 */
export const createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create listing",
    });
  }
};

/**
 * @desc    Get all listings (with pagination & filters)
 * @route   GET /api/listings
 * @access  Public
 * @query   page, limit, status, polymerType, search
 */
export const getAllListings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.polymerType) filter.polymerType = req.query.polymerType;

    // Optional search by name or description
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [listings, total] = await Promise.all([
      Listing.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Listing.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: listings.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch listings",
    });
  }
};

/**
 * @desc    Get single listing by ID
 * @route   GET /api/listings/:id
 * @access  Public
 */
export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Listing ID format",
      });
    }

    const listing = await Listing.findById(id).lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch listing",
    });
  }
};

/**
 * @desc    Update listing
 * @route   PUT /api/listings/:id
 * @access  Protected (later)
 */
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Listing ID format",
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: listing,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update listing",
    });
  }
};

/**
 * @desc    Delete listing
 * @route   DELETE /api/listings/:id
 * @access  Protected (later)
 */
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Listing ID format",
      });
    }

    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete listing",
    });
  }
};