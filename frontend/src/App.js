// src/App.jsx
import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import VendorSignup from "./Pages/VendorSignup";

function App() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="vendor/register" element={<VendorSignup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
