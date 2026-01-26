const Vendor = require("../models/Vendor.js");
const User = require("../models/User.js");
const sendEmail = require("../utils/sendEmail.js");

// ============================
// REGISTER VENDOR
// ============================
const registerVendor = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};

    // 🔍 Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email: data.email });
    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "Vendor already registered with this email",
      });
    }

    // 🔍 Check if user exists
    let user = await User.findOne({ email: data.email });

    // Create user if not exists
    if (!user) {
      user = await User.create({ email: data.email, role: "user" });
    }

    // 🚫 Prevent admin from becoming vendor
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot register as vendor",
      });
    }

    const vendor = await Vendor.create({
      ...data,
      user: user._id,
      status: "pending",
      rejectReason: "",

      aadhaarFile: files.aadhaarFile?.[0]?.filename || "",
      panFile: files.panFile?.[0]?.filename || "",
      gstFile: files.gstFile?.[0]?.filename || "",
      fssaiFile: files.fssaiFile?.[0]?.filename || "",
      regDocument: files.regDocument?.[0]?.filename || "",
      addressProof: files.addressProof?.[0]?.filename || "",
      bankDoc: files.bankDoc?.[0]?.filename || "",
    });

    // 📧 Email Confirmation
    await sendEmail(
      vendor.email,
      "Vendor Registration Submitted - Kutir",
      `
  <div style="background:#f7f4eb;padding:40px 0;font-family:Arial,sans-serif;">
    <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;border:1px solid #e4dcc7;">
      
      <h2 style="text-align:center;color:#660B05;margin-bottom:20px;">
        🌿 Welcome to Kutir!
      </h2>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        Hi <strong>${vendor.fullName}</strong>,
        <br><br>
        Thank you for registering as a vendor on <strong>Kutir</strong> — India’s marketplace for handmade, local and sustainable products.
      </p>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        Your application has been successfully received and is currently <strong>under review</strong> by our team.
      </p>

      <p style="color:#3E0703;font-size:15px;line-height:24px;">
        Once your documents are verified, you will receive a confirmation email and access to your Vendor Panel.
      </p>

      <div style="margin:30px 0;text-align:center;">
        <span style="display:inline-block;background:#FFF0C4;color:#660B05;padding:10px 18px;border-radius:6px;font-weight:600;">
          Status: Under Review
        </span>
      </div>

      <p style="color:#3E0703;font-size:14px;">
        Thank you for supporting local artisans and handmade craftsmanship.
      </p>

      <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">

      <p style="color:#8C1007;font-size:13px;text-align:center;">
        With warmth, <br/>
        <strong>Kutir Team</strong><br/>
        🌿 Vocal for Local • Local to Global
      </p>
    </div>
  </div>
  `
    );

    return res.status(201).json({
      success: true,
      message: "Vendor registration submitted successfully.",
      vendor,
    });

  } catch (err) {
    console.error("Vendor Registration Error:", err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ============================
// GET VENDOR STATUS BY EMAIL
// ============================
const getVendorStatusByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.json({ exists: false });
    }

    return res.json({
      exists: true,
      status: vendor.status,
      rejectReason: vendor.rejectReason || "",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { registerVendor, getVendorStatusByEmail };
