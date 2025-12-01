import React, { useState } from "react";
import toast from "react-hot-toast";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);

  const sendOtp = () => {
    if (!email.trim() || !email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    if (!agree) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }

    setOtpSent(true);
    toast.success("OTP sent!");
  };

  const loginUser = () => {
    if (!agree) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }

    if (!otp.trim()) {
      toast.error("Enter OTP.");
      return;
    }

    if (otp.length < 4) {
      toast.error("OTP must be at least 4 digits.");
      return;
    }

    toast.success("Logged in successfully!");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0C4]/40 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-2xl border border-[#660B05]/20">

        <h2 className="text-3xl font-semibold text-center text-[#3E0703] mb-6">
          Login
        </h2>

        {/* EMAIL INPUT */}
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* SEND OTP BUTTON — ONLY IF EMAIL ENTERED & OTP NOT SENT */}
        {!otpSent && email.trim() !== "" && (
          <Button title="Send OTP" onClick={sendOtp} />
        )}

        {/* OTP INPUT + LOGIN BUTTON AFTER OTP SENT */}
        {otpSent && (
          <>
            <Input
              label="Enter OTP"
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button title="Login" onClick={loginUser} />
          </>
        )}

        {/* TERMS CHECKBOX — ALWAYS VISIBLE */}
        <div className="flex items-start gap-2 mb-2 mt-4">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="w-4 h-4 mt-1 accent-[#660B05]"
          />
          <label htmlFor="agree" className="text-sm text-[#3E0703]">
            I agree to the{" "}
            <span className="text-[#8C1007] font-semibold cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and consent to receive OTP via email.
          </label>
        </div>

      </div>
    </div>
  );
}

export default Login;
