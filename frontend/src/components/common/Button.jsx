import React from "react";
import COLORS from "./Colors";

function Button({ title, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2.5 font-medium rounded-lg transition 
        bg-[${COLORS.accent}] text-white hover:bg-[${COLORS.hover}] ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
