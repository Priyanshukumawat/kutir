import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Button from "../common/Button";
import Input from "../common/Input";

function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [rejectReasons, setRejectReasons] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch vendors
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axiosInstance.get("/admin/vendors");
      setVendors(res.data.vendors || res.data);
    } catch (err) {
      console.error("Fetch vendors error:", err);
    }
  };

  // Approve Vendor
  const approveVendor = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/admin/approve/${id}`);
      await fetchVendors();
    } catch (err) {
      console.error("Approve error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reject Vendor
  const rejectVendor = async (id) => {
    try {
      if (!rejectReasons[id])
        return alert("Please enter rejection reason");

      setLoading(true);
      await axiosInstance.put(`/admin/reject/${id}`, {
        reason: rejectReasons[id],
      });
      await fetchVendors();
    } catch (err) {
      console.error("Reject error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">
        Vendor Verification Panel
      </h2>

      <div className="space-y-4">
        {vendors.map((v) => (
          <div
            key={v._id}
            className="bg-white rounded shadow border border-accent/20"
          >
            {/* HEADER */}
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setExpanded(expanded === v._id ? null : v._id)}
            >
              <div>
                <p className="font-semibold text-primary">
                  {v.fullName} ({v.businessName})
                </p>
                <p className="text-sm text-gray-500">{v.email}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      v.status === "approved"
                        ? "text-green-600"
                        : v.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }
                  >
                    {v.status.toUpperCase()}
                  </span>
                </p>
              </div>

              <span className="text-sm text-accent">
                {expanded === v._id ? "Hide ▲" : "View ▼"}
              </span>
            </div>

            {/* DETAILS */}
            {expanded === v._id && (
              <div className="p-4 border-t grid md:grid-cols-2 gap-4 text-sm">

                {/* PERSONAL INFO */}
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Personal Details
                  </h3>
                  <p>📱 Mobile: {v.mobile}</p>
                  <p>🎂 DOB: {v.dob || "N/A"}</p>
                  <p>⚥ Gender: {v.gender || "N/A"}</p>
                </div>

                {/* BUSINESS INFO */}
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Business Details
                  </h3>
                  <p>🏢 Business: {v.businessName}</p>
                  <p>📧 Business Email: {v.businessEmail}</p>
                  <p>📍 {v.address1}, {v.city}, {v.state} - {v.pincode}</p>
                  <p>📦 Categories: {v.categories.join(", ")}</p>
                  <p>🏷 Types: {v.businessTypes.join(", ")}</p>
                </div>

                {/* BANK INFO */}
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Bank Details
                  </h3>
                  <p>👤 Name: {v.accName}</p>
                  <p>🏦 Bank: {v.bankName}</p>
                  <p>🔢 Acc No: {v.accNumber}</p>
                  <p>💳 IFSC: {v.ifsc}</p>
                </div>

                {/* DOCUMENTS */}
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Documents
                  </h3>
                  {v.aadhaarFile && <DocLink label="Aadhaar" file={v.aadhaarFile} />}
                  {v.panFile && <DocLink label="PAN" file={v.panFile} />}
                  {v.gstFile && <DocLink label="GST" file={v.gstFile} />}
                  {v.fssaiFile && <DocLink label="FSSAI" file={v.fssaiFile} />}
                  {v.regDocument && <DocLink label="Registration" file={v.regDocument} />}
                  {v.addressProof && <DocLink label="Address Proof" file={v.addressProof} />}
                  {v.bankDoc && <DocLink label="Bank Proof" file={v.bankDoc} />}
                </div>

                {/* ABOUT */}
                {v.about && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-primary mb-2">About</h3>
                    <p>{v.about}</p>
                  </div>
                )}

                {/* ACTIONS */}
                {v.status === "pending" && (
                  <div className="md:col-span-2 space-y-3 mt-3">
                    <Input
                      label="Reject Reason"
                      placeholder="Enter reason if rejecting"
                      value={rejectReasons[v._id] || ""}
                      onChange={(e) =>
                        setRejectReasons({
                          ...rejectReasons,
                          [v._id]: e.target.value,
                        })
                      }
                    />

                    <div className="flex gap-3">
                      <Button
                        title="Approve Vendor"
                        onClick={() => approveVendor(v._id)}
                        className="bg-green-600 hover:bg-green-700"
                      />
                      <Button
                        title="Reject Vendor"
                        onClick={() => rejectVendor(v._id)}
                        className="bg-red-600 hover:bg-red-700"
                      />
                    </div>
                  </div>
                )}

                {/* SHOW REJECTION */}
                {v.status === "rejected" && v.rejectReason && (
                  <div className="md:col-span-2 text-red-600 mt-2">
                    ❌ Rejected: {v.rejectReason}
                  </div>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// Document Link Component
function DocLink({ label, file }) {
  return (
    <p>
      📄{" "}
      <a
        href={`http://localhost:5000/uploads/${file}`}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline"
      >
        {label}
      </a>
    </p>
  );
}

export default ManageVendors;
