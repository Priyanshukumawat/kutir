import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../common/LogoutPopup";

function AdminSidebar({ open, onClose, setView }) {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    ["Dashboard", "dashboard"],
    ["Vendors", "vendors"],
    ["Products", "products"],
    ["Orders", "orders"],
    ["Users", "users"],
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white border-r shadow-lg md:shadow-none z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          flex flex-col
        `}
      >
        {/* Menu (fills available height) */}
        <div className="p-4 space-y-2 flex-1 overflow-y-auto">
          <h2 className="text-lg font-bold text-accent mb-4 md:hidden">
            Menu
          </h2>

          {menuItems.map(([label, key]) => (
            <button
              key={key}
              onClick={() => {
                setView(key);
                onClose && onClose(); // closes mobile drawer
              }}
              className="w-full text-left px-3 py-2 rounded hover:bg-accent hover:text-cream text-primary font-medium"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Logout always at bottom */}
        <div className="p-4 border-t">
          <button
            onClick={() => setOpenLogout(true)}
            className="w-full px-3 py-2 rounded text-left text-accent font-semibold hover:bg-cream"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation */}
      <LogoutPopup
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default AdminSidebar;
