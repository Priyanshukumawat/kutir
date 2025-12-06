import React from "react";
import Input from "../../components/common/Input";
import { MdOutlineInfo } from "react-icons/md";

const Info = ({ text }) => (
  <span className="ml-1 text-accent cursor-pointer inline-flex items-center relative group">
    <MdOutlineInfo size={16} />
    <span className="absolute left-5 top-[-5px] w-56 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition z-20">
      {text}
    </span>
  </span>
);

// Nice document upload UI
const FileUpload = ({ label, info, error, onChange, accept }) => (
  <div className="mt-4">
    <label className="text-sm text-primary flex items-center mb-1">
      {label}
      {info && <Info text={info} />}
    </label>
    <div className="border-2 border-dashed border-accent/50 rounded-lg px-4 py-3 bg-cream/10 flex justify-between items-center text-xs">
      <div>
        <p className="font-medium text-primary">Click to upload</p>
        <p className="text-[11px] text-primary/70">
          {accept || "PDF / JPG / PNG"} • Max 2MB
        </p>
      </div>
      <label className="cursor-pointer text-accent font-semibold text-xs">
        Browse
        <input
          type="file"
          className="hidden"
          accept={accept || ".pdf,.jpg,.jpeg,.png"}
          onChange={onChange}
        />
      </label>
    </div>
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

function PersonalDetails({ form, errors, update, next }) {
  return (
    <div>
      {/* Full Name (only letters + spaces) */}
      <Input
        label="Full Name"
        value={form.fullName}
        maxLength={50}
        error={errors.fullName}
        onChange={(e) => {
          const raw = e.target.value;
          if (/^[A-Za-z\s]*$/.test(raw)) {
            update("fullName", raw.slice(0, 50));
          }
        }}
        placeholder="Enter your full name"
      />

      {/* Mobile */}
      <Input
        label="Mobile Number"
        value={form.mobile}
        maxLength={10}
        error={errors.mobile}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          update("mobile", raw.slice(0, 10));
        }}
        placeholder="10-digit mobile number"
      />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        value={form.email}
        maxLength={60}
        error={errors.email}
        onChange={(e) => update("email", e.target.value.slice(0, 60))}
        placeholder="you@example.com"
      />

      {/* DOB */}
      <Input
        label="Date of Birth"
        type="date"
        max={new Date().toISOString().split("T")[0]}
        value={form.dob}
        error={errors.dob}
        onChange={(e) => update("dob", e.target.value)}
      />

      {/* Gender */}
      <div className="mt-2">
        <label className="text-sm text-primary mb-1">Gender</label>
        <select
          value={form.gender}
          onChange={(e) => update("gender", e.target.value)}
          className="w-full border border-accent px-3 py-2 rounded-lg text-sm"
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {errors.gender && (
          <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
        )}
      </div>

      {/* Aadhaar upload with nice UI */}
      <FileUpload
        label="Aadhaar Card"
        info="Upload clear front and back image or PDF of your Aadhaar."
        error={errors.aadhaarFile}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => update("aadhaarFile", e.target.files?.[0] || null)}
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={next}
          className="px-5 py-2 bg-accent text-white rounded-lg hover:bg-hover text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default PersonalDetails;
