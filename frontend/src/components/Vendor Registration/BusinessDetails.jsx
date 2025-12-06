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

// Common fancy file upload box
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

function BusinessDetails({
  form,
  errors,
  update,
  selectedBusinessTypes,
  toggleBusinessType,
  selectedCategories,
  toggleCategory,
  businessTypes,
  subCategoryMap,
  next,
  prev,
}) {
  // About word count
  const aboutWords = form.about.trim()
    ? form.about.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div>
      {/* BUSINESS INFO */}
      <Input
        label="Business Name"
        value={form.businessName}
        maxLength={80}
        error={errors.businessName}
        onChange={(e) => update("businessName", e.target.value.slice(0, 80))}
        placeholder="Your brand / shop name"
      />

      <Input
        label="Business Email"
        value={form.businessEmail}
        maxLength={60}
        error={errors.businessEmail}
        onChange={(e) => update("businessEmail", e.target.value.slice(0, 60))}
        placeholder="business@example.com"
      />

      <Input
        label="Address Line 1"
        value={form.address1}
        maxLength={100}
        error={errors.address1}
        onChange={(e) => update("address1", e.target.value.slice(0, 100))}
        placeholder="House / Flat / Street"
      />

      <Input
        label="Address Line 2"
        value={form.address2}
        maxLength={100}
        onChange={(e) => update("address2", e.target.value.slice(0, 100))}
        placeholder="Area / Landmark (optional)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="City"
          value={form.city}
          maxLength={50}
          error={errors.city}
          onChange={(e) => {
            const raw = e.target.value;
            if (/^[A-Za-z\s]*$/.test(raw)) {
              update("city", raw.slice(0, 50));
            }
          }}
          placeholder="City"
        />

        <Input
          label="State"
          value={form.state}
          maxLength={50}
          error={errors.state}
          onChange={(e) => {
            const raw = e.target.value;
            if (/^[A-Za-z\s]*$/.test(raw)) {
              update("state", raw.slice(0, 50));
            }
          }}
          placeholder="State"
        />

        <Input
          label="Pincode"
          value={form.pincode}
          maxLength={6}
          error={errors.pincode}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            update("pincode", raw.slice(0, 6));
          }}
          placeholder="6-digit pincode"
        />
      </div>

      {/* BUSINESS TYPES */}
      <div className="mt-6">
        <label className="text-primary font-semibold text-sm flex items-center">
          Type of Business{" "}
          <Info text="Select all relevant types that match what you sell." />
        </label>

        <div className="flex flex-wrap gap-2 mt-2">
          {businessTypes.map((bt) => (
            <button
              key={bt.id}
              type="button"
              onClick={() => toggleBusinessType(bt.id)}
              className={`px-3 py-1 text-xs rounded-full border ${
                selectedBusinessTypes.includes(bt.id)
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-primary border-accent/40"
              }`}
            >
              {bt.label}
            </button>
          ))}
        </div>

        {errors.businessTypes && (
          <p className="text-xs text-red-600 mt-1">{errors.businessTypes}</p>
        )}
      </div>

      {/* SUB CATEGORIES */}
      {selectedBusinessTypes.length > 0 && (
        <div className="mt-6">
          <label className="text-primary text-sm font-semibold flex items-center">
            Categories You Will Sell{" "}
            <Info text="Select all categories under your chosen business types." />
          </label>

          {selectedBusinessTypes.map((bt) => (
            <div key={bt} className="mt-3">
              <p className="text-xs font-semibold">
                {businessTypes.find((x) => x.id === bt)?.label}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {subCategoryMap[bt]?.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={`px-3 py-1 text-[11px] rounded-full border ${
                      selectedCategories.includes(c)
                        ? "bg-accent text-white border-accent"
                        : "bg-white text-primary border-accent/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {errors.categories && (
            <p className="text-xs text-red-600 mt-1">{errors.categories}</p>
          )}
        </div>
      )}

      {/* DOCUMENTS SECTION */}
      <div className="mt-6">
        <h3 className="text-primary text-sm font-semibold flex items-center mb-1">
          Business Documents
          <Info text="These help us verify your business and enable smooth payouts." />
        </h3>

        {/* PAN always visible */}
        <Input
          label="PAN Number"
          value={form.pan}
          maxLength={10}
          error={errors.pan}
          onChange={(e) => {
            const raw = e.target.value.toUpperCase();
            const sanitized = raw.replace(/[^A-Z0-9]/gi, "").slice(0, 10);
            update("pan", sanitized);
          }}
          placeholder="AAAAA9999A"
        />

        <FileUpload
          label="PAN Card"
          info="Upload a clear image or PDF of your PAN card."
          error={errors.panFile}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => update("panFile", e.target.files?.[0] || null)}
        />

        {/* GST: optional but shown */}
        <Input
          label="GST Number (Optional)"
          value={form.gst}
          maxLength={15}
          error={errors.gst}
          onChange={(e) => {
            const raw = e.target.value.toUpperCase();
            const sanitized = raw.replace(/[^A-Z0-9]/gi, "").slice(0, 15);
            update("gst", sanitized);
          }}
          placeholder="15-digit GSTIN (if available)"
        />

        <FileUpload
          label="GST Certificate (Optional)"
          info="Upload GST registration certificate if you have GST."
          error={errors.gstFile}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => update("gstFile", e.target.files?.[0] || null)}
        />

        {/* FSSAI only if food */}
        {selectedBusinessTypes.includes("food") && (
          <FileUpload
            label="FSSAI Certificate (Required for food vendors)"
            info="Mandatory license for selling packaged or edible food items."
            error={errors.fssaiFile}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => update("fssaiFile", e.target.files?.[0] || null)}
          />
        )}

        {/* Business Registration (optional) */}
        <FileUpload
          label="Business Registration (Udyam / MSME / Shop Act) — Optional"
          info="Upload business registration if available."
          error={errors.regDocument}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => update("regDocument", e.target.files?.[0] || null)}
        />

        {/* Address Proof (optional) */}
        <FileUpload
          label="Business Address Proof — Optional"
          info="Electricity bill, rent agreement, or shop proof."
          error={errors.addressProof}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => update("addressProof", e.target.files?.[0] || null)}
        />
      </div>

      {/* ABOUT */}
      <div className="mt-6">
        <label className="text-primary text-sm font-medium flex items-center">
          About Your Business
          <Info text="Share your story, what you make, and what makes your brand special." />
        </label>
        <textarea
          rows={4}
          className="border p-3 rounded-lg w-full text-sm mt-1"
          placeholder="Write 20–150 words about your brand, journey, and products."
          value={form.about}
          maxLength={1500}
          onChange={(e) => update("about", e.target.value)}
        />
        <p className="text-[11px] text-primary/70 mt-1">
          Word count: {aboutWords} (recommended 20–150)
        </p>
        {errors.about && (
          <p className="text-xs text-red-600 mt-1">{errors.about}</p>
        )}
      </div>

      {/* NAV BUTTONS */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 text-sm bg-cream border border-accent text-primary rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={next}
          className="px-5 py-2 bg-accent text-white rounded-lg text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default BusinessDetails;
