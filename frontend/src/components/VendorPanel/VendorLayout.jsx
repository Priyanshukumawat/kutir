import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function VendorLayout({ children }) {
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
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <aside className="w-64 bg-accent text-white p-6">
        <h2 className="text-2xl text-cream font-bold">Kutir Vendor</h2>
        <hr className="mb-5" />
        <nav className="space-y-3">
          {menu.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-2 py-2 rounded-lg transition ${isActive
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

      {/* Main */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default VendorLayout;
