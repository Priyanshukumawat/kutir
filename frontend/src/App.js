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
import VendorProducts from "./components/VendorPanel/VendorProducts";
import VendorProfile from "./components/VendorPanel/VendorProfile";
import VendorWallet from "./components/VendorPanel/VendorWallet";
import VendorLayout from "./components/VendorPanel/VendorLayout";
import VendorOrders from "./components/VendorPanel/VendorOrders";
import VendorSupportAndPolicies from "./components/VendorPanel/VendorSupportAndPolicies";
import VendorMarketingTools from "./components/VendorPanel/VendorMarketingTools";
import VendorReviewsAndRatings from "./components/VendorPanel/VendorReviewsAndRatings";
import VendorAddProduct from "./components/VendorPanel/VendorAddProduct";
import Assistance from "./Pages/Assistance";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import UserPanel from "./Pages/UserPanel";
import Profile from "./components/UserPanel/Profile";
import Orders from "./components/UserPanel/Orders";
import Addresses from "./components/UserPanel/Addresses";
import CataloguePage from "./Pages/CataloguePage";
import SpecificCatalogue from "./components/Catalogue/SpecificCatalogue";
import SpecificProductPage from "./Pages/SpecificProductPage";
import CheckoutPage from "./Pages/CheckoutPage";

function App() {
  return (
    <>
      <Toaster />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="vendor/register" element={<VendorSignup />} />
          <Route path="kutir-assist" element={<KutirAssist />} />
          <Route path="assistance" element={<Assistance />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/catalogue/:id"
            element={<SpecificCatalogue />}
          />
          {/* <Route path="shop" element={<Product />} /> */}
          <Route path="new-arrivals" element={<ProductPage />} />
          <Route path="collections" element={<ProductPage />} />
          <Route path="best-sellers" element={<ProductPage />} />

          <Route
            path="/user-panel"
            element={
              <ProtectedRoute allowedRoles={["user", "vendor", "admin"]}>
                <UserPanel />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<Orders />} />
          </Route>



          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<SpecificProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />


        </Route>

        <Route
          path="vendor-panel"
          element={
            <ProtectedRoute role="vendor">
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorDashboard />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="products/add" element={<VendorAddProduct />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="wallet" element={<VendorWallet />} />
          <Route path="reviews" element={<VendorReviewsAndRatings />} />
          <Route path="marketing" element={<VendorMarketingTools />} />
          <Route path="support" element={<VendorSupportAndPolicies />} />
          <Route path="profile" element={<VendorProfile />} />
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
