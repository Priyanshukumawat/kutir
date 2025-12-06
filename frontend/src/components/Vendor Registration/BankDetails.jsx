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

function BankDetails({ form, errors, update, agreed, setAgreed, submit, prev }) {
  return (
    <div>
      <Input
        label="Account Holder Name"
        value={form.accName}
        maxLength={50}
        error={errors.accName}
        onChange={(e) => {
          const raw = e.target.value;
          if (/^[A-Za-z\s]*$/.test(raw)) {
            update("accName", raw.slice(0, 50));
          }
        }}
        placeholder="Name as per bank records"
      />

      <Input
        label="Account Number"
        value={form.accNumber}
        maxLength={18}
        error={errors.accNumber}
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          update("accNumber", raw.slice(0, 18));
        }}
        placeholder="9–18 digit account number"
      />

      <Input
        label="IFSC Code"
        value={form.ifsc}
        maxLength={11}
        error={errors.ifsc}
        onChange={(e) => {
          const raw = e.target.value.toUpperCase();
          const sanitized = raw.replace(/[^A-Z0-9]/gi, "").slice(0, 11);
          update("ifsc", sanitized);
        }}
        placeholder="e.g. SBIN0001234"
      />

      <Input
        label="Bank Name"
        value={form.bankName}
        maxLength={50}
        error={errors.bankName}
        onChange={(e) => {
          const raw = e.target.value;
          if (/^[A-Za-z\s]*$/.test(raw)) {
            update("bankName", raw.slice(0, 50));
          }
        }}
      />

      <Input
        label="Branch Name"
        value={form.branch}
        maxLength={50}
        error={errors.branch}
        onChange={(e) => {
          const raw = e.target.value;
          if (/^[A-Za-z\s]*$/.test(raw)) {
            update("branch", raw.slice(0, 50));
          }
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="Bank City"
          value={form.bankCity}
          maxLength={50}
          error={errors.bankCity}
          onChange={(e) => {
            const raw = e.target.value;
            if (/^[A-Za-z\s]*$/.test(raw)) {
              update("bankCity", raw.slice(0, 50));
            }
          }}
        />
        <Input
          label="Bank State"
          value={form.bankState}
          maxLength={50}
          error={errors.bankState}
          onChange={(e) => {
            const raw = e.target.value;
            if (/^[A-Za-z\s]*$/.test(raw)) {
              update("bankState", raw.slice(0, 50));
            }
          }}
        />
        <Input
          label="Country"
          value={form.bankCountry}
          maxLength={50}
          error={errors.bankCountry}
          onChange={(e) => {
            const raw = e.target.value;
            if (/^[A-Za-z\s]*$/.test(raw)) {
              update("bankCountry", raw.slice(0, 50));
            }
          }}
        />
      </div>

      <FileUpload
        label="Bank Proof"
        info="Upload passbook first page or a cancelled cheque to verify your payout account."
        error={errors.bankDoc}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => update("bankDoc", e.target.files?.[0] || null)}
      />

      {/* Terms & Conditions */}
      <div className="flex items-start mt-5 gap-2">
        <input
          id="terms"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-primary">
          I agree to the{" "}
          <span className="text-accent underline cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and confirm that the above bank details are correct.
        </label>
      </div>
      {errors.agreed && (
        <p className="text-xs text-red-600 mt-1">{errors.agreed}</p>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="px-4 py-2 text-sm bg-cream border border-accent text-primary rounded-lg"
        >
          ← Back
        </button>

        <button
          disabled={!agreed}
          onClick={submit}
          className={`px-5 py-2 text-sm rounded-lg ${agreed
              ? "bg-accent text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
            }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default BankDetails;
