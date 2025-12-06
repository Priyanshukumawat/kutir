import React from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />

      {/* PUSH ALL CONTENT BELOW FIXED NAVBAR */}
      <div className="pt-24"> 
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
