import React from "react";
import { useNavigate } from "react-router-dom";

export default function KutirAssist() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/vendor/register");
  };

  const handleRequestAssist = () => {
    navigate("/vendor/assist-request");
  };

  return (
    <div className="min-h-screen bg-[#FFF0C4]/40 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-[#660B05]/20">
        <h1 className="text-3xl font-semibold text-[#3E0703] mb-6 text-center">
          Welcome to <span className="text-[#8C1007]">Kutir Assist</span>
        </h1>

        <p className="text-[#3E0703]/80 mb-6">
          If you are an artisan / creator starting out and don’t yet have all formal business
          documents — no worries. With Kutir Assist, we help you get everything you need to start
          selling legally and professionally: from legal registrations to marketing, product
          photos, packaging design & more.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#660B05] mb-4">
            What documents / credentials are commonly required
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-[#3E0703]">
            <li>Identity proof (e.g. Aadhaar or govt-issued ID)</li>
            <li>Bank account details + bank proof (cancelled cheque / bank statement)</li>
            <li>PAN card (for tax compliance / GST registration)</li>
            <li>Address proof / business-address proof (electricity bill, rent agreement, etc.)</li>
            <li>GST registration (optional — if you plan to scale, sell interstate or online frequently)</li>
            <li>If you have a firm/partnership/LLP — business incorporation / firm registration docs + authorised signatory proof</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#660B05] mb-4">
            How Kutir Assist Can Help You — Services We Offer
          </h2>
          <ul className="list-disc ml-5 space-y-2 text-[#3E0703]">
            <li>Assistance in obtaining PAN / GST / MSME registrations</li>
            <li>Help with address-proof or business-address documentation</li>
            <li>Bank account & bank-proof guidance / support</li>
            <li>Professional product photography & image editing (to make your handmade items look great online)</li>
            <li>Packaging design & labeling assistance (for décor, crafts, fragile items, etc.)</li>
            <li>Social media & digital marketing support — listing optimization, social presence, campaigns</li>
            <li>Product design / branding / labeling support (for jewellery, clothes, art, etc.)</li>
            <li>Accounting / CA support so your taxes / returns / GST compliance is managed</li>
            <li>General mentorship & hand-holding for new artisans to build business from scratch</li>
          </ul>
        </section>

        <p className="text-[#3E0703]/80 mb-6">
          👉 If you already have all required documents — you can directly register as a vendor. <br />
          👉 If you don’t — request Kutir Assist and our team will reach out to help you get started.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleRegister}
            className="px-6 py-3 bg-[#660B05] text-white rounded-lg hover:bg-[#8C1007] transition-colors w-full sm:w-auto"
          >
            Register as Vendor (I have docs)
          </button>
          <button
            onClick={handleRequestAssist}
            className="px-6 py-3 border border-[#660B05] text-[#660B05] rounded-lg hover:bg-[#FFF0C4] transition-colors w-full sm:w-auto"
          >
            Request Kutir Assist Help
          </button>
        </div>
      </div>
    </div>
  );
}
