import React from "react";

function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-primary mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg border bg-white text-primary
          focus:outline-none focus:ring-2
          ${error
            ? "border-red-500 focus:ring-red-400"
            : "border-accent focus:ring-hover"
          }`}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
