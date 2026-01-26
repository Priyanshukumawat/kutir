import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import VendorSignup from "./Pages/VendorSignup";
import ScrollToTop from "./components/common/ScrollToTop";
import KutirAssist from "./Pages/KutirAssist";
import VendorDashboard from "./components/VendorPanel/VendorDashboard";
import AdminPanel from "./Pages/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute role="user">
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="vendor/register" element={<VendorSignup />} />
          <Route path="kutir-assist" element={<KutirAssist />} />

          <Route
            path="vendor-panel"
            element={
              <ProtectedRoute role="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="admin-panel"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
