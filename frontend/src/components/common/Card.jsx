import React from "react";

function Card({
  children,
  className = "",
  padding = "p-5",
}) {
  return (
    <div
      className={`
        bg-white 
        rounded-2xl 
        border border-accent/20 
        shadow-sm 
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
