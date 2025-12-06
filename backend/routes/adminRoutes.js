const express = require("express");
const {
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorProfile,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/vendors", getAllVendors);
router.get("/vendor/:vendorId", getVendorProfile);
router.put("/approve/:vendorId", approveVendor);
router.put("/reject/:vendorId", rejectVendor);

module.exports = router;