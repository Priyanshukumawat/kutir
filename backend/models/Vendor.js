const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String },
    gender: { type: String },
    aadhaarFile: { type: String },

    businessName: { type: String, required: true },
    businessEmail: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },

    businessTypes: { type: [String], default: [] },
    categories: { type: [String], default: [] },

    pan: { type: String },
    panFile: { type: String },

    gst: { type: String },
    gstFile: { type: String },

    fssaiFile: { type: String },
    regDocument: { type: String },
    addressProof: { type: String },

    about: { type: String },

    accName: { type: String },
    accNumber: { type: String },
    ifsc: { type: String },
    bankName: { type: String },
    branch: { type: String },
    bankCity: { type: String },
    bankState: { type: String },
    bankCountry: { type: String },
    bankDoc: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectReason: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
