import React from "react";
import Button from "./Button";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-end gap-3 mt-4">
      <Button
        title="Prev"
        onClick={() => onPageChange(page - 1)}
        className="w-auto px-4"
        disabled={page === 1}
      />

      <span className="flex items-center text-sm text-primary">
        Page {page} of {totalPages}
      </span>

      <Button
        title="Next"
        onClick={() => onPageChange(page + 1)}
        className="w-auto px-4"
        disabled={page === totalPages}
      />
    </div>
  );
}

export default Pagination;
