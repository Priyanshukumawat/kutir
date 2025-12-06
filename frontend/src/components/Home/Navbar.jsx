import React, { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../common/LogoutPopup";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);

  // Mega-menu states
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);

  const navRef = useRef(null);
  const navigate = useNavigate();

  // USER
  const user = JSON.parse(localStorage.getItem("kutirUser"));

  // TEMP COUNTS
  const cartCount = 2;
  const wishlistCount = 4;

  // Click outside
  useEffect(() => {
    const closeEverything = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(false);
        setCategoriesOpen(false);
        setRegionsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeEverything);
    return () => document.removeEventListener("mousedown", closeEverything);
  }, []);

  // Confirm Logout
  const confirmLogout = () => {
    localStorage.removeItem("kutirUser");
    localStorage.removeItem("token");
    setLogoutPopup(false);
    navigate("/");
    window.location.reload();
  };

  // Navigation handler
  const handleNavigate = (path) => {
    setMenuOpen(false);
    setDropdown(false);
    setCategoriesOpen(false);
    setRegionsOpen(false);
    navigate(path);
  };

  const megaCategories = [
    {
      title: "Home & Living",
      items: ["Clay Mugs", "Terracotta Decor", "Handwoven Baskets", "Wooden Toys"],
    },
    {
      title: "Apparel & Accessories",
      items: ["Handloom Sarees", "Khadi Kurtas", "Jewellery", "Dupattas"],
    },
    {
      title: "Festive & Gifts",
      items: ["Puja Essentials", "Gift Hampers", "Brass Decor", "Rangoli Art"],
    },
  ];

  const regions = [
    "All India",
    "Rajasthan",
    "Gujarat",
    "Kerala",
    "West Bengal",
    "Kashmir",
    "North East",
  ];

  return (
    <>
      <LogoutPopup
        open={logoutPopup}
        onClose={() => setLogoutPopup(false)}
        onConfirm={confirmLogout}
      />

      <nav
        ref={navRef}
        className="w-full fixed top-0 left-0 z-50 bg-[#660B05] text-[#FFF0C4] shadow-lg border-b border-[#552004]/30"
      >
        {/* ================= TOP ROW ================= */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

          {/* LOGO */}
          <h1
            onClick={() => handleNavigate("/")}
            className="text-3xl font-semibold cursor-pointer tracking-wide"
          >
            Kutir
          </h1>

          {/* DESKTOP SEARCH BAR */}
          <div className="hidden md:flex flex-1 max-w-md bg-[#ffff] text-[#660B05] px-4 py-1.5 rounded-xl border border-[#660B05]/30 shadow-inner">
            <input
              type="text"
              placeholder="Search handmade crafts..."
              className="w-full bg-transparent outline-none ml-2 text-sm"
            />
            <FiSearch className="text-lg mt-1" />
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-6 text-xl">

            {/* WISHLIST */}
            <div
              onClick={() => handleNavigate("/user/wishlist")}
              className="relative cursor-pointer hover:text-[#FFF0C4]"
            >
              <FiHeart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFF0C4] text-[#660B05] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* CART */}
            <div
              onClick={() => handleNavigate("/cart")}
              className="relative cursor-pointer hover:text-[#FFF0C4]"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFF0C4] text-[#660B05] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>

            {/* USER DROPDOWN */}
            <div className="relative">
              <FiUser
                className="cursor-pointer hover:text-[#FFF0C4]"
                onClick={() => setDropdown((prev) => !prev)}
              />

              {dropdown && (
                <div className="absolute right-0 mt-3 w-72 bg-white text-[#660B05] rounded-xl shadow-xl border border-[#660B05]/20 py-2 z-50">
                  {/* NOT LOGGED */}
                  {!user && (
                    <>
                      <p className="px-4 py-2 text-xs opacity-70">Namaste 👋</p>
                      <hr />
                      <p
                        onClick={() => handleNavigate("/login")}
                        className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer"
                      >
                        Login / Signup
                      </p>
                      <p
                        onClick={() => handleNavigate("/vendor/register")}
                        className="px-4 py-2 font-semibold text-[#8C1007] hover:bg-[#FFF0C4] cursor-pointer"
                      >
                        Become a Vendor ⭐
                      </p>
                    </>
                  )}

                  {/* LOGGED IN */}
                  {user && (
                    <>
                      <p className="px-4 py-1 text-xs opacity-70">
                        Namaste, {user.email}
                      </p>
                      <hr />

                      {user.role === "user" && (
                        <>
                          <p onClick={() => handleNavigate("/user/profile")} className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer">Your Profile</p>
                          <p onClick={() => handleNavigate("/user/orders")} className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer">Your Orders</p>
                          <p onClick={() => handleNavigate("/user/wishlist")} className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer">Wishlist</p>
                          <p onClick={() => handleNavigate("/vendor/register")} className="px-4 py-2 font-semibold text-[#8C1007] hover:bg-[#FFF0C4] cursor-pointer">
                            Become a Vendor ⭐
                          </p>
                        </>
                      )}

                      {user.role === "admin" && (
                        <p onClick={() => handleNavigate("/admin/dashboard")} className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer">Admin Dashboard</p>
                      )}

                      {user.role === "vendor" && (
                        <p onClick={() => handleNavigate("/vendor/dashboard")} className="px-4 py-2 hover:bg-[#FFF0C4] cursor-pointer">Vendor Dashboard</p>
                      )}

                      <hr />

                      <p
                        onClick={() => setLogoutPopup(true)}
                        className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                      >
                        Logout
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TOP ICONS */}
          <div className="md:hidden flex items-center gap-4 text-xl">
            <FiSearch onClick={() => setMobileSearch((prev) => !prev)} className="cursor-pointer" />
            {menuOpen ? (
              <FiX
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              />
            ) : (
              <FiMenu
                onClick={() => setMenuOpen(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* ================= DESKTOP SECOND ROW ================= */}
        <div className="hidden md:block border-t border-[#FFF0C4]/20">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-10 text-sm">

            {["Home", "Kutir Assist", "Shop", "New Arrivals", "Best Sellers", "Artisans", "Collections"].map(
              (item) => (
                <p
                  key={item}
                  onClick={() => handleNavigate(`/${item.toLowerCase().replace(/ /g, "-")}`)}
                  className="cursor-pointer relative group"
                >
                  {item}

                  {/* Underline animation */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFF0C4] transition-all duration-300 group-hover:w-full"></span>
                </p>
              )
            )}

            {/* ---- CATEGORIES ---- */}
            <div
              className="relative group"
              onClick={() => {
                setCategoriesOpen(!categoriesOpen);
                setRegionsOpen(false);
              }}
            >
              <p className="cursor-pointer inline-flex items-center gap-1">
                Categories <FiChevronDown className="text-xs" />
              </p>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFF0C4] transition-all duration-300 group-hover:w-full"></span>

              {categoriesOpen && (
                <div className="absolute left-0 mt-3 w-[650px] bg-[#ffff] text-[#3E0703] rounded-xl shadow-2xl border border-[#660B05]/20 p-4 z-50">
                  <div className="grid grid-cols-3 gap-4">
                    {megaCategories.map((cat) => (
                      <div key={cat.title}>
                        <h4 className="font-semibold text-[#8C1007] mb-2">{cat.title}</h4>
                        {cat.items.map((i) => (
                          <p key={i} className="cursor-pointer hover:text-[#660B05]">
                            {i}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ---- REGIONS ---- */}
            <div
              className="relative group"
              onClick={() => {
                setRegionsOpen(!regionsOpen);
                setCategoriesOpen(false);
              }}
            >
              <p className="cursor-pointer inline-flex items-center gap-1">
                Regions <FiChevronDown className="text-xs" />
              </p>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#FFF0C4] transition-all duration-300 group-hover:w-full"></span>

              {regionsOpen && (
                <div className="absolute left-0 mt-3 w-52 bg-[#ffff] text-[#3E0703] rounded-xl shadow-xl border border-[#660B05]/20 py-2 z-40">
                  {regions.map((r) => (
                    <p key={r} className="px-4 py-1 hover:bg-[#FFF0C4] cursor-pointer">
                      {r}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        {mobileSearch && (
          <div className="md:hidden w-full bg-[#ffff] px-4 py-3 flex items-center gap-3 border-t border-[#660B05]/20">
            <input
              type="text"
              placeholder="Search handmade products..."
              className="w-full bg-transparent outline-none text-[#3E0703]"
            />
            <FiSearch className="text-[#660B05] text-xl" />
          </div>
        )}

        {/* MOBILE MENU (NO EXTRA CLOSE ICON) */}
        {menuOpen && (
          <div
            className="md:hidden bg-white text-[#660B05] px-6 py-5 flex flex-col gap-4 shadow-lg overflow-y-auto max-h-[80vh]"
            style={{ scrollbarWidth: "none" }}
          >
            {/* HIDE SCROLLBAR IN WEBKIT */}
            <style>{`
      div::-webkit-scrollbar {
        display: none;
      }
    `}</style>

            {/* ---- USER SECTION ---- */}
            {!user && (
              <>
                <p onClick={() => handleNavigate("/login")} className="cursor-pointer">
                  Login / Signup
                </p>
                <p
                  onClick={() => handleNavigate("/vendor/register")}
                  className="cursor-pointer font-semibold text-[#8C1007]"
                >
                  Become a Vendor ⭐
                </p>
              </>
            )}

            {user && (
              <>
                <p className="text-xs opacity-70">Hello, {user.email}</p>

                {user.role === "user" && (
                  <>
                    <p onClick={() => handleNavigate("/user/profile")} className="cursor-pointer">
                      Your Profile
                    </p>
                    <p onClick={() => handleNavigate("/user/orders")} className="cursor-pointer">
                      Your Orders
                    </p>
                    <p onClick={() => handleNavigate("/user/wishlist")} className="cursor-pointer">
                      Wishlist
                    </p>
                    <p
                      onClick={() => handleNavigate("/vendor/register")}
                      className="cursor-pointer font-semibold text-[#8C1007]"
                    >
                      Become a Vendor ⭐
                    </p>
                  </>
                )}

                {user.role === "admin" && (
                  <p onClick={() => handleNavigate("/admin/dashboard")} className="cursor-pointer">
                    Admin Dashboard
                  </p>
                )}

                {user.role === "vendor" && (
                  <>
                    <p onClick={() => handleNavigate("/vendor/dashboard")} className="cursor-pointer">
                      Vendor Dashboard
                    </p>
                    <p onClick={() => handleNavigate("/user/profile")} className="cursor-pointer">
                      Profile
                    </p>
                  </>
                )}

                <hr />


              </>
            )}


            {/* ---- MAIN NAV ITEMS ---- */}
            <p onClick={() => handleNavigate("/")} className="cursor-pointer">Home</p>
            <p onClick={() => handleNavigate("/kutir-assist")} className="cursor-pointer">Kutir Assist</p>
            <p onClick={() => handleNavigate("/shop")} className="cursor-pointer">Shop</p>
            <p onClick={() => handleNavigate("/new-arrivals")} className="cursor-pointer">New Arrivals</p>
            <p onClick={() => handleNavigate("/best-sellers")} className="cursor-pointer">Best Sellers</p>

            <details>
              <summary className="cursor-pointer flex items-center justify-between">
                Categories <FiChevronDown />
              </summary>
              <div className="pl-4 pt-1">
                {megaCategories.flatMap((c) => c.items).map((i) => (
                  <p key={i}>{i}</p>
                ))}
              </div>
            </details>

            <details>
              <summary className="cursor-pointer flex items-center justify-between">
                Regions <FiChevronDown />
              </summary>
              <div className="pl-4 pt-1">
                {regions.map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </div>
            </details>

            <hr />

            {/* ---- WISHLIST ---- */}
            <p
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleNavigate("/user/wishlist")}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="bg-[#660B05] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </p>

            {/* ---- CART ---- */}
            <p
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleNavigate("/cart")}
            >
              Cart
              {cartCount > 0 && (
                <span className="bg-[#660B05] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </p>

            <p
              onClick={() => setLogoutPopup(true)}
              className="cursor-pointer text-red-600"
            >
              Logout
            </p>


          </div>
        )}

      </nav>
    </>
  );
}

export default Navbar;
