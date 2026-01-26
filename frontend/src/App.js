// src/App.jsx
import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import VendorSignup from "./Pages/VendorSignup";
import ScrollToTop from "./components/common/ScrollToTop";
import KutirAssist from "./Pages/KutirAssist";
import VendorDashboard from "./components/Vendor Panel/VendorDashboard";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="vendor/register" element={<VendorSignup />} />
          <Route path="kutir-assist" element={<KutirAssist />} />
          <Route path="vendor-panel" element={<VendorDashboard />} />
        </Route>
        <Route path="admin-panel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
