import BuyerInquiry from "../models/BuyerInquiry.model.js";
import Listing from "../models/Listing.model.js";

/**
 * @desc    Create new buyer inquiry
 * @route   POST /api/inquiries
 */
export const createBuyerInquiry = async (req, res) => {
  try {
    const { listingId, quantity, pricePerKg } = req.body;
    const buyerId = req.user?._id || req.body.buyerId;

    if (!listingId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "listingId and quantity are required",
      });
    }

    // Verify listing exists and is active
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "This listing is not active",
      });
    }

    // Check if quantity meets minimum order requirement
    if (quantity < listing.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order quantity is ${listing.minOrder} MT`,
      });
    }

    const inquiry = await BuyerInquiry.create({
      listingId,
      buyerId,
      quantity,
      pricePerKg: pricePerKg || listing.pricePerKg, // Use provided price or listing price
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all inquiries with full details (Admin)
 * @route   GET /api/inquiries
 */
export const getAllInquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const inquiries = await BuyerInquiry.find(filter)
      .populate({
        path: "listingId",
        select: "polymerType polymerGrade pricePerKg mfi minOrder dataSheetUrl status",
        populate: {
          path: "submittedBy",
          select: "name mobileNumber location",
        },
      })
      .populate({
        path: "buyerId",
        select: "name mobileNumber location gstDocumentUrl profileImage status",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await BuyerInquiry.countDocuments(filter);

    // Format response with all required fields
    const formattedInquiries = inquiries.map((inquiry) => {
      const listing = inquiry.listingId;
      const buyer = inquiry.buyerId;
      const seller = listing?.submittedBy;

      return {
        _id: inquiry._id,
        inquiryDate: inquiry.createdAt,
        status: inquiry.status,
        isViewedByAdmin: inquiry.isViewedByAdmin,
        quantity: inquiry.quantity,
        pricePerKg: inquiry.pricePerKg || listing?.pricePerKg || 0,
        
        // Buyer Details
        buyer: {
          id: buyer?._id,
          name: buyer?.name || "N/A",
          mobile: buyer?.mobileNumber || "N/A",
          location: buyer?.location || "N/A",
          gstDocument: buyer?.gstDocumentUrl || "",
          profileImage: buyer?.profileImage || "",
          accountStatus: buyer?.status || "Pending",
        },
        
        // Seller Details
        seller: {
          id: seller?._id,
          name: seller?.name || "N/A",
          mobile: seller?.mobileNumber || "N/A",
          location: seller?.location || "N/A",
        },
        
        // Product/Listing Details
        product: {
          polymerType: listing?.polymerType || "N/A",
          polymerGrade: listing?.polymerGrade || "N/A",
          mfi: listing?.mfi || 0,
          pricePerKg: listing?.pricePerKg || 0,
          minOrder: listing?.minOrder || 0,
          dataSheetUrl: listing?.dataSheetUrl || "",
          listingStatus: listing?.status || "Passive",
        },
        
        adminRemark: inquiry.adminRemark || "",
      };
    });

    res.status(200).json({
      success: true,
      count: formattedInquiries.length,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      data: formattedInquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get single inquiry details (Admin)
 * @route   GET /api/inquiries/:id
 */
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await BuyerInquiry.findById(req.params.id)
      .populate({
        path: "listingId",
        populate: {
          path: "submittedBy",
          select: "name mobileNumber location gstDocumentUrl",
        },
      })
      .populate("buyerId", "name mobileNumber location gstDocumentUrl profileImage");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Mark as viewed by admin
    if (!inquiry.isViewedByAdmin) {
      inquiry.isViewedByAdmin = true;
      await inquiry.save();
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update inquiry status (Admin)
 * @route   PATCH /api/inquiries/:id/status
 */
export const updateInquiryStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = {
      status,
      isViewedByAdmin: true,
    };

    if (adminRemark !== undefined) {
      updateData.adminRemark = adminRemark;
    }

    const inquiry = await BuyerInquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("listingId", "polymerType polymerGrade pricePerKg")
      .populate("buyerId", "name mobileNumber");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Inquiry ${status} successfully`,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get buyer's own inquiries
 * @route   GET /api/inquiries/my-inquiries
 */
export const getMyInquiries = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const inquiries = await BuyerInquiry.find({ buyerId })
      .populate("listingId", "polymerType polymerGrade pricePerKg mfi minOrder")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get statistics for admin dashboard
 * @route   GET /api/inquiries/stats
 */
export const getInquiryStats = async (req, res) => {
  try {
    const stats = await BuyerInquiry.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const unviewedCount = await BuyerInquiry.countDocuments({
      isViewedByAdmin: false,
    });

    const formattedStats = {
      total: await BuyerInquiry.countDocuments(),
      pending: stats.find((s) => s._id === "pending")?.count || 0,
      approved: stats.find((s) => s._id === "approved")?.count || 0,
      rejected: stats.find((s) => s._id === "rejected")?.count || 0,
      unviewed: unviewedCount,
    };

    res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};