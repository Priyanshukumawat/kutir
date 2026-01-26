import React from "react";

function AdminDashboard() {
  const stats = [
    { label: "Total Vendors", value: 45 },
    { label: "Total Products", value: 320 },
    { label: "Orders Today", value: 21 },
    { label: "Total Users", value: 1240 },
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-accent">{s.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
