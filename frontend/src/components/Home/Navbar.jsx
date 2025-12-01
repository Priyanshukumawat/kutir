import React, { useState } from "react";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#660B05] text-[#FFF0C4] shadow-sm border-b border-[#660B05]/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-semibold tracking-wide  cursor-pointer"
        >
          Kutir
        </h1>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex gap-10 font-medium ">
          {["Home", "Shop", "Categories", "About"].map((item) => (
            <li
              key={item}
              className="cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-8 text-2xl  relative">

          {/* USER ICON + DROPDOWN */}
          <div className="relative">
            <FiUser
              className="cursor-pointer "
              onClick={() => setDropdown(!dropdown)}
            />

            {/* DROPDOWN */}
            {dropdown && (
              <div className="absolute right-0 whitespace-nowrap mt-3 w-fit text-sm bg-white text-[#660B05] shadow-lg border border-[#660B05]/20 rounded-xl py-2">
                <p
                  onClick={() => {
                    setDropdown(false);
                    navigate("/login");
                  }}
                  className="px-4 py-2  hover:bg-[#FFF0C4] cursor-pointer"
                >
                  Login/Signup
                </p>
                <p
                  onClick={() => {
                    setDropdown(false);
                    navigate("/vendor/register");
                  }}
                  className="px-4 py-2  hover:bg-[#FFF0C4] cursor-pointer"
                >
                  Become a Vendor
                </p>
              </div>
            )}
          </div>

          {/* CART ICON */}
          <FiShoppingCart className="cursor-pointer " />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden text-3xl  cursor-pointer">
          {menuOpen ? (
            <FiX onClick={() => setMenuOpen(false)} />
          ) : (
            <FiMenu onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white text-[#660B05] shadow-lg border-t border-[#660B05]/20 py-4 px-6 flex flex-col gap-4  font-medium">

          {/* Links */}
          {["Home", "Shop", "Categories", "About"].map((item) => (
            <p key={item} className="cursor-pointer ">
              {item}
            </p>
          ))}

          {/* Login */}
          <p
            className="cursor-pointer "
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Login/Signup
          </p>

          {/* Become vendor */}
          <p
            className="cursor-pointer "
            onClick={() => {
              setMenuOpen(false);
              navigate("/vendor/register");
            }}
          >
            Become a Vendor
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
