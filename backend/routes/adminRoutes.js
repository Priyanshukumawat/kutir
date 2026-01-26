const express = require("express");
const {
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorProfile,
} = require("../controllers/adminController");

const router = express.Router();

// Get all vendors
router.get("/vendors", getAllVendors);

// Get vendor profile
router.get("/vendor/:vendorId", getVendorProfile);

// Approve vendor
router.put("/approve/:vendorId", approveVendor);

// Reject vendor
router.put("/reject/:vendorId", rejectVendor);

module.exports = router;
