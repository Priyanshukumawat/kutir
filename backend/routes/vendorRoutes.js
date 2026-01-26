const express = require("express");
const { registerVendor, getVendorStatusByEmail } = require("../controllers/vendorController.js");
const multer = require("multer");

const router = express.Router();

// FILE STORAGE
const upload = multer({ dest: "uploads/" });

router.get("/status", getVendorStatusByEmail);
router.post(
  "/register",
  upload.fields([
    { name: "aadhaarFile", maxCount: 1 },
    { name: "panFile", maxCount: 1 },
    { name: "gstFile", maxCount: 1 },
    { name: "fssaiFile", maxCount: 1 },
    { name: "regDocument", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "bankDoc", maxCount: 1 },
  ]),
  registerVendor
);

module.exports = router;
