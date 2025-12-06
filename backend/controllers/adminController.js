const Vendor = require("../models/Vendor.js");
const sendEmail = require("../utils/sendEmail.js");

const approveVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "approved", rejectReason: "" },
      { new: true }
    );

    // Send approval email
    await sendEmail(
      vendor.email,
      "Vendor Approved",
      `Congratulations ${vendor.fullName}! Your vendor profile has been approved.`
    );

    res.json({ success: true, message: "Vendor approved", vendor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const rejectVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { reason } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "rejected", rejectReason: reason },
      { new: true }
    );

    // Send rejection email
    await sendEmail(
      vendor.email,
      "Vendor Rejected",
      `Hello ${vendor.fullName}, unfortunately your vendor application was rejected.\nReason: ${reason}`
    );

    res.json({ success: true, message: "Vendor rejected", vendor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getVendorProfile = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ success: false, error: "Vendor not found" });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorProfile,
};
