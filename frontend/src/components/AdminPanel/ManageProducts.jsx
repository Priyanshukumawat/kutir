import React from "react";

function ManageProducts() {
  const products = [
    { id: 1, name: "Handmade Soap", vendor: "Green Crafts", status: "Live" },
    { id: 2, name: "Pickle Jar", vendor: "Village Foods", status: "Pending" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Manage Products</h2>
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">Vendor: {p.vendor}</p>
            <p className="text-sm text-gray-500">Status: {p.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageProducts;
