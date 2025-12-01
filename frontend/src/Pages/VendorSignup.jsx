import React, { useState } from "react";
import Input from "../common/Input";
import COLORS from "../common/Colors";
import toast from "react-hot-toast";

function VendorSignup() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false); // <-- NEW
  const [agree, setAgree] = useState(false); // <-- NEW

  const [form, setForm] = useState({
    // Step 1: Personal
    fullname: "",
    phone: "",
    email: "",
    aadhaar: "",
    pan: "",

    // Step 2: Business
    businessName: "",
    businessType: "",
    businessEmail: "",
    gst: "",
    address: "",

    // Step 3: Bank & Docs
    bankName: "",
    accountNumber: "",
    ifsc: "",

    aadhaarDoc: null,
    panDoc: null,
    gstDoc: null,
    bankDoc: null,
  });

  const [errors, setErrors] = useState({});

  const update = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------------- VALIDATIONS ------------------
  const validateStep1 = () => {
    const stepErrors = {};

    if (!form.fullname.trim()) stepErrors.fullname = "Full name is required.";
    else if (form.fullname.trim().length < 3)
      stepErrors.fullname = "Full name must be at least 3 characters.";

    if (!form.phone.trim()) stepErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      stepErrors.phone = "Enter a valid 10-digit phone number.";

    if (!form.email.trim()) stepErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email.trim()))
      stepErrors.email = "Enter a valid email address.";

    if (!form.aadhaar.trim()) stepErrors.aadhaar = "Aadhaar number is required.";
    else if (!/^\d{12}$/.test(form.aadhaar.trim()))
      stepErrors.aadhaar = "Aadhaar must be exactly 12 digits.";

    if (!form.pan.trim()) stepErrors.pan = "PAN number is required.";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.trim().toUpperCase()))
      stepErrors.pan = "Enter a valid 10-character PAN (ABCDE1234F).";

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = () => {
    const stepErrors = {};

    if (!form.businessName.trim())
      stepErrors.businessName = "Business name is required.";
    else if (form.businessName.trim().length < 3)
      stepErrors.businessName = "Business name must be at least 3 characters.";

    if (!form.businessType)
      stepErrors.businessType = "Please select a business type.";

    if (!form.businessEmail.trim())
      stepErrors.businessEmail = "Business email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.businessEmail.trim()))
      stepErrors.businessEmail = "Enter a valid business email.";

    if (form.gst.trim() && form.gst.trim().length !== 15)
      stepErrors.gst = "GST number must be 15 characters.";

    if (!form.address.trim())
      stepErrors.address = "Business address is required.";
    else if (form.address.trim().length < 10)
      stepErrors.address = "Address is too short. Add more details.";

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep3 = () => {
    const stepErrors = {};

    if (!form.bankName.trim())
      stepErrors.bankName = "Bank name is required.";

    if (!form.accountNumber.trim())
      stepErrors.accountNumber = "Account number is required.";
    else if (!/^\d{9,18}$/.test(form.accountNumber.trim()))
      stepErrors.accountNumber = "Enter a valid 9–18 digit account number.";

    if (!form.ifsc.trim()) stepErrors.ifsc = "IFSC code is required.";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.trim()))
      stepErrors.ifsc = "Enter a valid IFSC (e.g., HDFC0009830).";

    if (!form.aadhaarDoc)
      stepErrors.aadhaarDoc = "Upload Aadhaar document.";

    if (!form.panDoc) stepErrors.panDoc = "Upload PAN document.";

    if (form.gst.trim() && !form.gstDoc)
      stepErrors.gstDoc = "Upload GST certificate.";

    if (!form.bankDoc)
      stepErrors.bankDoc = "Upload cancelled cheque / bank proof.";

    if (!agree)
      stepErrors.agree = "You must agree to the Terms & Conditions.";

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // ---------------- BUTTON LOGIC ------------------
  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    if (!validateStep3()) return;

    toast.success("Vendor registration submitted for verification ✨");
    setSubmitted(true);
  };

  const lineProgress = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  // ---------------- SUCCESS SCREEN ------------------
  if (submitted) {
    return (
      <div className="min-h-screen flex justify-center items-center px-4 bg-[#FFF0C4]/40">
        <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-lg text-center border border-[#660B05]/30">
          <h2 className="text-2xl font-semibold text-[#3E0703] mb-3">
            🎉 Thank You for Registering!
          </h2>
          <p className="text-[#3E0703]/80 leading-relaxed">
            Your vendor application has been submitted successfully.
            <br />
            Our team will review your details and verify your documents.
            <br />
            You will be notified once your vendor profile is approved.
          </p>
        </div>
      </div>
    );
  }

  // ---------------- FORM UI ------------------
  return (
    <div className="min-h-screen bg-[#FFF0C4]/40 flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl bg-white mt-5 shadow-lg p-8 rounded-2xl border border-[#660B05]/20">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#3E0703] mb-6 text-center">
          Become a Vendor on <span className="text-[#8C1007]">Kutir</span>
        </h1>

        {/* STEPPER */}
        <div className="mb-10">
          <div className="relative">
            <div className="h-1 w-full bg-[#FFF0C4] rounded-full"></div>
            <div
              className="h-1 bg-[#660B05] rounded-full absolute top-0 left-0 transition-all duration-500"
              style={{ width: lineProgress }}
            ></div>

            <div className="absolute -top-3 left-0 right-0 flex justify-between">
              {[1, 2, 3].map((s, idx) => {
                const active = step === s;
                const completed = step > s;
                return (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs 
                      ${active || completed ? "bg-[#660B05] text-white" : "bg-white border border-[#660B05]"}`}
                    >
                      {s}
                    </div>
                    <span className="text-[11px] mt-1 text-[#3E0703]">
                      {idx === 0
                        ? "Personal"
                        : idx === 1
                          ? "Business"
                          : "Bank & Docs"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-start">
          {/* FORM */}
          <div>
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-[#3E0703] mb-4">
                  Personal Details
                </h2>

                <Input label="Full Name" name="fullname" value={form.fullname} onChange={update} placeholder="Your full name" error={errors.fullname} />
                <Input label="Phone Number" name="phone" value={form.phone} onChange={update} placeholder="10-digit phone" error={errors.phone} />
                <Input label="Email Address" name="email" type="email" value={form.email} onChange={update} placeholder="Email address" error={errors.email} />
                <Input label="Aadhaar Number" name="aadhaar" maxLength={12} value={form.aadhaar} onChange={update} placeholder="12-digit Aadhaar" error={errors.aadhaar} />
                <Input label="PAN Number" name="pan" maxLength={10} value={form.pan.toUpperCase()} onChange={update} placeholder="10-character PAN" error={errors.pan} />
              </>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-[#3E0703] mb-4">
                  Business Details
                </h2>

                <Input label="Business Name" name="businessName" value={form.businessName} onChange={update} placeholder="Business name" error={errors.businessName} />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#3E0703] mb-1">
                    Business Type
                  </label>
                  <select
                    name="businessType"
                    value={form.businessType}
                    onChange={update}
                    className={`w-full px-4 py-2 rounded-lg bg-white 
                      ${errors.businessType ? "border-red-500" : `border-[${COLORS.accent}]`} text-[${COLORS.primary}]`}
                  >
                    <option value="">Select type</option>
                    <option value="Handicraft">Handicraft</option>
                    <option value="Handloom">Handloom</option>
                    <option value="Organic">Organic Products</option>
                    <option value="Artisan">Artisan Goods</option>
                  </select>
                  {errors.businessType && (
                    <p className="text-xs text-red-600 mt-1">{errors.businessType}</p>
                  )}
                </div>

                <Input
                  label="Business Email"
                  name="businessEmail"
                  type="email"
                  value={form.businessEmail}
                  onChange={update}
                  placeholder="Your business email"
                  error={errors.businessEmail}
                />

                <Input
                  label="GST Number (Optional)"
                  name="gst"
                  value={form.gst}
                  onChange={update}
                  placeholder="15-character GST"
                  error={errors.gst}
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#3E0703] mb-1">
                    Business Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={update}
                    placeholder="Full business address"
                    className={`w-full px-4 py-2 rounded-lg bg-white h-24 
                      ${errors.address ? "border-red-500" : `border-[${COLORS.accent}]`} text-[${COLORS.primary}]`}
                  ></textarea>
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="text-xs text-[#3E0703]/70 bg-[#FFF0C4]/50 p-3 rounded-lg mt-2">
                  📌 Please ensure your business information is accurate.
                  This helps us verify your identity and build trust on Kutir.
                </div>
              </>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-[#3E0703] mb-4">
                  Bank & Documents
                </h2>

                <Input label="Bank Name" name="bankName" value={form.bankName} onChange={update} placeholder="Your bank name" error={errors.bankName} />
                <Input label="Account Number" name="accountNumber" maxLength={18} value={form.accountNumber} onChange={update} placeholder="9–18 digit account number" error={errors.accountNumber} />
                <Input label="IFSC Code" name="ifsc" value={form.ifsc} maxLength={11} onChange={update} placeholder="Ex: HDFC0009830" error={errors.ifsc} />

                {/* FILE UPLOAD SECTIONS */}
                <div className="mt-4 space-y-5">
                  {/* Aadhaar */}
                  <div>
                    <label className="block text-sm mb-1 text-[#3E0703] font-medium">
                      Upload Aadhaar Card
                    </label>
                    <div className="bg-[#FFF0C4]/40 border border-[#660B05]/30 p-3 rounded-lg">
                      <input type="file" name="aadhaarDoc" onChange={update} className="text-sm" />
                    </div>
                    {errors.aadhaarDoc && (
                      <p className="text-xs text-red-600 mt-1">{errors.aadhaarDoc}</p>
                    )}
                  </div>

                  {/* PAN */}
                  <div>
                    <label className="block text-sm mb-1 text-[#3E0703] font-medium">
                      Upload PAN Card
                    </label>
                    <div className="bg-[#FFF0C4]/40 border border-[#660B05]/30 p-3 rounded-lg">
                      <input type="file" name="panDoc" onChange={update} className="text-sm" />
                    </div>
                    {errors.panDoc && (
                      <p className="text-xs text-red-600 mt-1">{errors.panDoc}</p>
                    )}
                  </div>

                  {/* GST */}
                  {form.gst.trim() && (
                    <div>
                      <label className="block text-sm mb-1 text-[#3E0703] font-medium">
                        Upload GST Certificate
                      </label>
                      <div className="bg-[#FFF0C4]/40 border border-[#660B05]/30 p-3 rounded-lg">
                        <input type="file" name="gstDoc" onChange={update} className="text-sm" />
                      </div>
                      {errors.gstDoc && (
                        <p className="text-xs text-red-600 mt-1">{errors.gstDoc}</p>
                      )}
                    </div>
                  )}

                  {/* BANK PROOF */}
                  <div>
                    <label className="block text-sm mb-1 text-[#3E0703] font-medium">
                      Upload Cancelled Cheque / Bank Proof
                    </label>
                    <div className="bg-[#FFF0C4]/40 border border-[#660B05]/30 p-3 rounded-lg">
                      <input type="file" name="bankDoc" onChange={update} className="text-sm" />
                    </div>
                    {errors.bankDoc && (
                      <p className="text-xs text-red-600 mt-1">{errors.bankDoc}</p>
                    )}
                  </div>
                </div>

                {/* TERMS AND CONDITIONS (Step 3 Only) */}
                <div className="flex items-start gap-2 mt-5">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="h-4 w-4 accent-[#660B05] mt-1"
                  />
                  <label className="text-sm text-[#3E0703]">
                    I agree to the{" "}
                    <span className="text-[#8C1007] font-medium cursor-pointer">
                      Terms & Conditions
                    </span>{" "}
                    and acknowledge that my business information will undergo
                    verification by Kutir.
                  </label>
                </div>
                {errors.agree && (
                  <p className="text-xs text-red-600 mt-1">{errors.agree}</p>
                )}
              </>
            )}

            {/* BUTTONS */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-[#660B05] text-[#3E0703] rounded-lg hover:bg-[#FFF0C4]"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-[#660B05] text-white rounded-lg hover:bg-[#8C1007]"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#660B05] text-white rounded-lg hover:bg-[#8C1007]"
                >
                  Submit for Verification
                </button>
              )}
            </div>
          </div>

          {/* STICKER */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-[#FFF0C4] flex items-center justify-center text-4xl mb-3">
              {step === 1 ? "👤" : step === 2 ? "🏬" : "🏦"}
            </div>
            <p className="text-sm text-center text-[#3E0703]/80">
              {step === 1 && "Tell us about yourself so buyers can trust you."}
              {step === 2 && "Share your business details to grow on Kutir."}
              {step === 3 && "We verify your bank details for secure payouts."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorSignup;
