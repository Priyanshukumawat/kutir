import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function ManageVendors() {
  const [vendors] = useState([
    { id: 1, name: "Green Crafts", status: "Pending" },
    { id: 2, name: "Village Foods", status: "Approved" },
  ]);

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Manage Vendors</h2>
      <div className="space-y-4">
        {vendors.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold text-primary">{v.name}</p>
              <p className="text-sm text-gray-500">{v.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageVendors;
