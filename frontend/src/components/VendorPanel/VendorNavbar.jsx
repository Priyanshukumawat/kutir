import { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSearch,
  FiLogOut,
  FiHome,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function VendorNavbar({ toggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("kutirUser"));

  const logout = () => {
    localStorage.removeItem("kutirUser");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="w-full bg-cream border-b border-accent/20 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-xl text-primary hover:text-accent"
        >
          <FiMenu />
        </button>

        {/* Brand */}
        <h1
          onClick={() => navigate("/vendor-panel")}
          className="text-2xl font-bold text-primary cursor-pointer"
        >
          Kutir <span className="text-accent text-sm">Vendor</span>
        </h1>
      </div>

      {/* CENTER SEARCH */}
      <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-xl w-[300px] border border-accent">
        <FiSearch className="text-primary mr-2" />
        <input
          type="text"
          placeholder="Search orders, products..."
          className="bg-white outline-none text-sm w-full"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FiBell className="text-xl text-primary" />
          <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FiUser className="text-xl text-primary" />
            <FiChevronDown className="text-sm text-primary" />
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-accent/20 rounded-xl shadow-lg overflow-hidden">
              <p className="px-4 py-2 text-xs text-gray-500">
                {user?.email}
              </p>

              <hr />

              <p
                onClick={() => navigate("/vendor-panel/profile")}
                className="px-4 py-2 hover:bg-cream cursor-pointer"
              >
                My Profile
              </p>

              <p
                onClick={() => navigate("/")}
                className="px-4 py-2 hover:bg-cream cursor-pointer flex items-center gap-2"
              >
                <FiHome /> Go to Home
              </p>

              <hr />

              <p
                onClick={logout}
                className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default VendorNavbar;
