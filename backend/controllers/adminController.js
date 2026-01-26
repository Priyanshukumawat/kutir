const Vendor = require("../models/Vendor.js");
const User = require("../models/User.js");
const sendEmail = require("../utils/sendEmail.js");

// Approve Vendor
const approveVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "approved", rejectReason: "" },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    // 🚀 UPDATE USER ROLE
    await User.findByIdAndUpdate(vendor.user, { role: "vendor" });

    await sendEmail(
      vendor.email,
      "🎉 Vendor Approved - Welcome to Kutir!",
      `
  <div style="background:#f7f4eb;padding:40px 0;font-family:Arial,sans-serif;">
    <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;border:1px solid #e4dcc7;">
      
      <h2 style="text-align:center;color:#660B05;margin-bottom:20px;">
        🎉 Congratulations, ${vendor.fullName}!
      </h2>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        We’re excited to inform you that your vendor profile on <strong>Kutir</strong> has been <strong>successfully approved</strong>! 🎊
      </p>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        You can now access your Vendor Panel and start listing your products, managing orders, and growing your business with us.
      </p>

      <div style="margin:30px 0;text-align:center;">
        <a href="http://localhost:5173/vendor-panel"
           style="display:inline-block;background:#660B05;color:#FFF0C4;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">
          Go to Vendor Panel
        </a>
      </div>

      <p style="color:#3E0703;font-size:14px;">
        Start by adding your first product and showcase your craftsmanship to customers across India.
      </p>

      <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">

      <p style="color:#8C1007;font-size:13px;text-align:center;">
        Best wishes, <br/>
        <strong>Kutir Team</strong><br/>
        🌿 Vocal for Local • Local to Global
      </p>
    </div>
  </div>
  `
    );


    res.json({ success: true, vendor });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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


    await User.findByIdAndUpdate(vendor.user, { role: "user" });


    // Send rejection email
    try {
      await sendEmail(
        vendor.email,
        "Vendor Application Update - Kutir",
        `
  <div style="background:#f7f4eb;padding:40px 0;font-family:Arial,sans-serif;">
    <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;border:1px solid #e4dcc7;">
      
      <h2 style="text-align:center;color:#660B05;margin-bottom:20px;">
        Vendor Application Update
      </h2>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        Hi <strong>${vendor.fullName}</strong>,
      </p>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        Thank you for your interest in becoming a vendor on <strong>Kutir</strong>.
      </p>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        After carefully reviewing your application, we regret to inform you that it could not be approved at this time.
      </p>

      <div style="margin:20px 0;padding:12px;background:#FFF0C4;border-left:4px solid #660B05;">
        <p style="margin:0;color:#660B05;font-weight:600;">Reason:</p>
        <p style="margin:5px 0 0;color:#3E0703;">${reason}</p>
      </div>

      <p style="color:#3E0703;font-size:14px;line-height:22px;">
        You are welcome to update your details and reapply after addressing the above concern.
      </p>

      <p style="color:#3E0703;font-size:14px;">
        We truly appreciate your effort and interest in supporting local artisans and handmade products.
      </p>

      <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">

      <p style="color:#8C1007;font-size:13px;text-align:center;">
        With regards, <br/>
        <strong>Kutir Team</strong><br/>
        🌿 Vocal for Local • Local to Global
      </p>
    </div>
  </div>
  `
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
