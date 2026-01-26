import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../common/LogoutPopup";

function AdminNavbar({ onMenuClick }) {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-accent text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-2xl text-cream"
            onClick={onMenuClick}
          >
            ☰
          </button>

          <h1 className="text-lg font-bold">Kutir Admin Panel</h1>
        </div>

        <button
          onClick={() => setOpenLogout(true)}
          className="hidden md:block px-4 py-1.5 rounded-md bg-hover hover:bg-primary text-cream text-sm"
        >
          Logout
        </button>
      </div>

      <LogoutPopup
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default AdminNavbar;
