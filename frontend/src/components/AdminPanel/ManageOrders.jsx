import React from "react";

function ManageOrders() {
  const orders = [
    { id: 101, user: "Amit", total: "₹450", status: "Delivered" },
    { id: 102, user: "Neha", total: "₹1200", status: "Pending" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Manage Orders</h2>
      <div className="space-y-3">
        {orders.map(o => (
          <div key={o.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">Order #{o.id}</p>
              <p className="text-sm text-gray-500">{o.user}</p>
            </div>
            <div>
              <p>{o.total}</p>
              <p className="text-sm text-gray-500">{o.status}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageOrders;
