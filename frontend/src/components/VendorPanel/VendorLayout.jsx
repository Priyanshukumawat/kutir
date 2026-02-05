import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import VendorNavbar from "./VendorNavbar";
import { FiChevronLeft } from "react-icons/fi";

function VendorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Products", path: "products" },
    { name: "Orders", path: "orders" },
    { name: "Wallet", path: "wallet" },
    { name: "Reviews & Ratings", path: "reviews" },
    { name: "Support & Policies", path: "support" },
    { name: "Marketing Tools", path: "marketing" },
    { name: "Profile", path: "profile" },
  ];

  return (
    <div className="flex min-h-screen ">
      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside className="w-64 bg-primary text-white p-6 relative">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-8 right-4 text-white"
          >
            <FiChevronLeft />
          </button>

          <h1
            onClick={() => navigate("/vendor-panel")}
            className="text-2xl font-bold text-cream cursor-pointer"
          >
            Kutir <span className="text-cream text-sm">Vendor</span>
          </h1>
          <hr className="mb-2 mt-2" />

          <nav className="space-y-2">
            {menu.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg transition ${isActive
                    ? "bg-cream text-primary"
                    : "hover:bg-cream hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <VendorNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default VendorLayout;
