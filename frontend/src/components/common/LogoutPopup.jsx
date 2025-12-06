import React from "react";

function LogoutPopup({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]">
      <div className="bg-white rounded-2xl w-[90%] max-w-sm p-6 shadow-lg border border-[#660B05]/20">
        
        <h2 className="text-xl font-semibold text-[#660B05] text-center mb-4">
          Are you sure you want to logout?
        </h2>

        <p className="text-center text-[#3E0703] mb-6">
          You will need to login again to continue using Kutir.
        </p>

        <div className="flex items-center justify-between gap-4">
          <button
            className="w-full py-2 rounded-lg border border-[#660B05] text-[#660B05] font-medium hover:bg-[#FFF0C4]"
            onClick={onClose}
          >
            No
          </button>

          <button
            className="w-full py-2 rounded-lg bg-[#660B05] text-[#FFF0C4] font-medium hover:bg-[#8C1007]"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
