/*

import mongoose from "mongoose";

const BuyerInquirySchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number, // MT
      required: true,
      min: 1,
    },

    pricePerKg: {
      type: Number,
      required: false, // Changed to false since controller doesn't set it
      min: 0,
    },
    
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isViewedByAdmin: {
      type: Boolean,
      default: false,
    },

    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes for better performance
BuyerInquirySchema.index({ status: 1, createdAt: -1 });
BuyerInquirySchema.index({ buyerId: 1 });
BuyerInquirySchema.index({ listingId: 1 });

export default mongoose.models.BuyerInquiry || mongoose.model("BuyerInquiry", BuyerInquirySchema);
*/

//---------------------------------------------------------------------------------------
import mongoose from "mongoose";

const BuyerInquirySchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number, // MT
      required: true,
      min: 1,
    },

    pricePerKg: {
      type: Number,
      required: false,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isViewedByAdmin: {
      type: Boolean,
      default: false,
    },

    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

// Indexes
BuyerInquirySchema.index({ status: 1, createdAt: -1 });
BuyerInquirySchema.index({ buyerId: 1 });
BuyerInquirySchema.index({ listingId: 1 });

export default mongoose.models.BuyerInquiry ||
  mongoose.model(
    "BuyerInquiry",
    BuyerInquirySchema,
    "buyer_inquiry" // ✅ FIX: force correct collection
  );