import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#660B05] text-[#FFF0C4] py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Kutir</h3>
          <p>
            Celebrating India’s craftsmanship.  
            Supporting artisans.  
            Handmade • Local • Pure.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>Shop</li>
            <li>Categories</li>
            <li>About Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p>Email: support@kutir.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      <p className="text-center mt-10 opacity-70">
        © 2025 Kutir. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
