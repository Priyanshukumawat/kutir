import React, { useState } from "react";
import AdminNavbar from "../components/AdminPanel/AdminNavbar";
import AdminSidebar from "../components/AdminPanel/AdminSidebar";
import AdminDashboard from "../components/AdminPanel/AdminDashboard";
import ManageVendors from "../components/AdminPanel/ManageVendors";
import ManageProducts from "../components/AdminPanel/ManageProducts";
import ManageOrders from "../components/AdminPanel/ManageOrders";
import ManageUsers from "../components/AdminPanel/ManageUsers";

function AdminPanel() {
  const [view, setView] = useState("dashboard");

  const renderView = () => {
    switch (view) {
      case "vendors":
        return <ManageVendors />;
      case "products":
        return <ManageProducts />;
      case "orders":
        return <ManageOrders />;
      case "users":
        return <ManageUsers />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar setView={setView} />
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
