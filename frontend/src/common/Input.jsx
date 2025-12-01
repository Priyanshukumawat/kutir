import React from "react";
import COLORS from "./Colors";

function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-[#3E0703] mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg border bg-white text-[${COLORS.primary}]
        focus:outline-none focus:ring-2
        ${error
          ? "border-red-500 focus:ring-red-400"
          : `border-[${COLORS.accent}] focus:ring-[${COLORS.hover}]`
        }`}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
