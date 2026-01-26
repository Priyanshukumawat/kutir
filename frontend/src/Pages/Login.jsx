import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [agree, setAgree] = useState(false);

  const [timer, setTimer] = useState(0); // ⏳ 60 sec countdown

  // ----------------------------
  // TIMER COUNTDOWN HANDLER
  // ----------------------------
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ----------------------------
  // SEND OTP
  // ----------------------------
  const handleSendOtp = async () => {
    try {
      if (!email.trim() || !email.includes("@"))
        return toast.error("Enter a valid email.");

      if (!agree)
        return toast.error("You must agree to the Terms & Conditions.");

      const { data } = await axiosInstance.post("/auth/send-otp", { email });

      if (data.success) {
        setOtpSent(true);
        setTimer(60); // Start 60 sec timer
        toast.success("OTP sent!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // VERIFY OTP
  const loginUser = async () => {
    try {
      if (!otp.trim()) return toast.error("Enter OTP.");

      const { data } = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log("🔐 LOGIN RESPONSE:", data);

      if (data.success) {

        // ⭐ SAVE USER + TOKEN IN LOCAL STORAGE
        const loggedUser = { email, role: data.role, token: data.token };
        localStorage.setItem("kutirUser", JSON.stringify(loggedUser));
        localStorage.setItem("token", data.token);

        console.log("📦 STORED USER:", loggedUser);

        toast.success("Logged in successfully!");

        // 🚀 ROLE BASED REDIRECT
        if (data.role === "admin") navigate("/admin-panel");
        else if (data.role === "vendor") navigate("/vendor-panel");
        else navigate("/");
        
        window.location.reload();   // refresh UI for navbar
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // CHANGE EMAIL (RESET FLOW)
  const changeEmail = () => {
    setOtpSent(false);
    setOtp("");
    setTimer(0);
    toast("Enter your email again");
  };

  // RESEND OTP
  const resendOtp = async () => {
    if (timer > 0) return; // Don't allow resend during cooldown

    try {
      const { data } = await axiosInstance.post("/auth/send-otp", { email });

      if (data.success) {
        setTimer(60);
        toast.success("OTP resent!");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF0C4]/40 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-2xl border border-[#660B05]/20">

        <h2 className="text-3xl font-semibold text-center text-[#3E0703] mb-6">
          Login
        </h2>

        {/* EMAIL FIELD (hidden after OTP sent) */}
        {!otpSent && (
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* SHOW EMAIL + CHANGE BUTTON */}
        {otpSent && (
          <div className="mb-4">
            <p className="text-[#3E0703] text-sm mb-1">Email</p>
            <div className="flex items-center justify-between bg-[#FFF0C4]/60 px-3 py-2 rounded-lg border border-[#660B05]/30">
              <span className="text-[#3E0703] text-sm">{email}</span>
              <button
                onClick={changeEmail}
                className="text-[#8C1007] text-xs underline"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* SEND OTP BUTTON (only before OTP sent) */}
        {!otpSent && email.trim() !== "" && (
          <Button title="Send OTP" onClick={handleSendOtp} />
        )}

        {/* OTP INPUT + LOGIN BUTTON */}
        {otpSent && (
          <>
            <Input
              label="Enter OTP"
              type="text"
              placeholder="4-digit OTP"
              value={otp}
              maxLength={4}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button title="Login" onClick={loginUser} />

            {/* RESEND OTP BUTTON */}
            <div className="text-center mt-3">
              {timer > 0 ? (
                <p className="text-sm text-[#3E0703]">
                  Resend OTP in <b>{timer}s</b>
                </p>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-[#8C1007] text-sm font-semibold underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {/* TERMS CHECKBOX */}
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
