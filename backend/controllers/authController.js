const User = require("../models/User");
const { generateOtp } = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");

// ----------------------------
// SEND OTP
// ----------------------------
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    // Generate OTP
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // 🔥 Console OTP for testing (dev mode)
    console.log("🔐 OTP for", email, "=>", otp);

    // Beautiful email template
    const emailHTML = `
    <div style="background:#f7f4eb;padding:40px 0;font-family:'Arial',sans-serif;">
      <div style="max-width:520px;margin:auto;background:#ffffff;border-radius:12px;padding:30px;border:1px solid #e4dcc7;">
        
        <h2 style="text-align:center;color:#8C1007;margin-bottom:30px;font-size:26px;">
          🔐 Your Kutir Login OTP
        </h2>

        <p style="color:#3E0703;font-size:16px;line-height:26px;">
          Hello,
          <br><br>
          Use the OTP below to securely log in to your Kutir account.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <div style="display:inline-block;background:#660B05;color:#FFF0C4;padding:14px 40px;font-size:32px;
               letter-spacing:5px;border-radius:8px;font-weight:bold;">
            ${otp}
          </div>
        </div>

        <p style="color:#3E0703;font-size:15px;line-height:24px;">
          This OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
        </p>

        <hr style="border:0;border-top:1px solid #eee;margin:30px 0;">

        <p style="color:#8C1007;font-size:14px;text-align:center;">
          Proudly supporting Indian artisans 🌿 | Kutir Marketplace
        </p>
      </div>
    </div>
    `;

    // Send OTP email
    const sent = await sendEmail(email, "Your Kutir Login OTP", emailHTML);

    if (!sent)
      return res.status(500).json({ success: false, message: "Failed to send OTP" });

    res.json({ success: true, message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------
// VERIFY OTP
// ----------------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------
// LOGOUT
// ----------------------------
exports.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({ success: true, message: "Logged out successfully" });
};
