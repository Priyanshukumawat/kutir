import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../common/LogoutPopup";

function AdminNavbar() {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth (example)
    localStorage.removeItem("adminToken");
    sessionStorage.clear();

    navigate("/login"); // redirect to login page
  };

  return (
    <>
      <div className="bg-accent text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">Kutir Admin Panel</h1>

        <button
          onClick={() => setOpenLogout(true)}
          className="px-4 py-1.5 rounded-md bg-hover hover:bg-primary text-cream text-sm"
        >
          Logout
        </button>
      </div>

      {/* Logout Popup */}
      <LogoutPopup
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default AdminNavbar;
