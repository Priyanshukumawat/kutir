const Vendor = require("../models/Vendor.js");
const sendEmail = require("../utils/sendEmail.js");

const registerVendor = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files || {};

    const vendor = await Vendor.create({
      ...data,
      status: "pending",
      rejectReason: "",

      // Files (filename only – because you're using multer local storage)
      aadhaarFile: files.aadhaarFile ? files.aadhaarFile[0].filename : "",
      panFile: files.panFile ? files.panFile[0].filename : "",
      gstFile: files.gstFile ? files.gstFile[0].filename : "",
      fssaiFile: files.fssaiFile ? files.fssaiFile[0].filename : "",
      regDocument: files.regDocument ? files.regDocument[0].filename : "",
      addressProof: files.addressProof ? files.addressProof[0].filename : "",
      bankDoc: files.bankDoc ? files.bankDoc[0].filename : "",
    });

    if (!vendor) {
      return res.status(400).json({
        success: false,
        message: "Vendor could not be created.",
      });
    }

    // Email Confirmation
    await sendEmail(
      vendor.email,
      "Vendor Registration Submitted",
      `
        <p>Hi <strong>${vendor.fullName}</strong>,</p>
        <p>Thank you for registering as a vendor on <strong>Kutir</strong>.</p>
        <p>Your application has been received and is currently under review.</p>
        <p>You will receive an update once the verification process is completed.</p>
        <br/>
        <p>Best Regards,<br/>Kutir Team</p>
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

// Export in CommonJS format
module.exports = { registerVendor };
