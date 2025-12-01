import React from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
