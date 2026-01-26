import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../common/LogoutPopup";

function AdminSidebar({ setView }) {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="w-56 bg-white border-r hidden md:flex flex-col justify-between">
        {/* Top Menu */}
        <div className="p-4 space-y-2">
          {[
            ["Dashboard", "dashboard"],
            ["Vendors", "vendors"],
            ["Products", "products"],
            ["Orders", "orders"],
            ["Users", "users"],
          ].map(([label, key]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className="w-full text-left px-3 py-2 rounded hover:bg-cream text-primary font-medium"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t">
          <button
            onClick={() => setOpenLogout(true)}
            className="w-full px-3 py-2 rounded text-left text-accent font-semibold hover:bg-cream"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      <LogoutPopup
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default AdminSidebar;
