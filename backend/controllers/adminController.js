const Vendor = require("../models/Vendor.js");
const sendEmail = require("../utils/sendEmail.js");

// Approve Vendor
const approveVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Find and update vendor status
    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "approved", rejectReason: "" },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    // Send approval email
    try {
      await sendEmail(
        vendor.email,
        "Vendor Approved - Kutir",
        `Hello ${vendor.fullName},\n\nYour vendor application has been approved. Welcome aboard!\n\nBest regards,\nKutir Team`
      );
    } catch (emailError) {
      console.error("Email send error:", emailError.message);
    }

    return res.json({
      success: true,
      message: "Vendor approved successfully",
      vendor,
    });
  } catch (err) {
    console.error("Approval error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during vendor approval",
      error: err.message,
    });
  }
};

// Reject Vendor
const rejectVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { reason } = req.body;

    // Validate reject reason
    if (!reason || reason.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid reject reason"
      });
    }

    // Update vendor status
    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "rejected", rejectReason: reason },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    // Send rejection email
    try {
      await sendEmail(
        vendor.email,
        "Vendor Rejected - Kutir",
        `Hello ${vendor.fullName},\n\nWe’re sorry to inform you that your vendor application was rejected.\n\nReason: ${reason}\n\nThank you for your interest.\nKutir Team`
      );
    } catch (emailError) {
      console.error("Email send error:", emailError.message);
    }

    return res.json({
      success: true,
      message: "Vendor rejected successfully",
      vendor,
    });
  } catch (err) {
    console.error("Rejection error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during vendor rejection",
      error: err.message,
    });
  }
};

// Get All Vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      vendors,
    });
  } catch (err) {
    console.error("Get all vendors error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching vendors",
      error: err.message,
    });
  }
};

// Get Single Vendor Profile
const getVendorProfile = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    return res.json({
      success: true,
      vendor,
    });
  } catch (err) {
    console.error("Get vendor profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching vendor profile",
      error: err.message,
    });
  }
};

module.exports = {
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorProfile,
};
