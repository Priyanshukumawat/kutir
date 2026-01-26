import React from "react";

function ManageUsers() {
  const users = [
    { id: 1, name: "Rahul", role: "Customer" },
    { id: 2, name: "Anjali", role: "Vendor" },
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-primary mb-4">Manage Users</h2>
      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-500">{u.role}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ManageUsers;
