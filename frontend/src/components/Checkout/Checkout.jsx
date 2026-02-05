import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

function Checkout() {
  /* ---------------- ADDRESSES ---------------- */
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "Jaipur, Rajasthan – 302001",
      phone: "+91 9876543210",
      isDefault: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const MAX_ADDRESSES = 5;

  const resetForm = () => {
    setForm({ name: "", address: "", phone: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSaveAddress = () => {
    if (!form.name || !form.address || !form.phone) return;

    if (editingId) {
      setAddresses(prev =>
        prev.map(a =>
          a.id === editingId ? { ...a, ...form } : a
        )
      );
    } else {
      if (addresses.length >= MAX_ADDRESSES) return;

      setAddresses(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          isDefault: prev.length === 0,
        },
      ]);
    }

    resetForm();
  };

  const setDefault = (id) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  /* ---------------- CART ---------------- */
  const cartItems = [
    {
      id: 1,
      name: "Handmade Blue Pottery Vase",
      qty: 1,
      price: 1200,
    },
    {
      id: 2,
      name: "Khadi Cotton Kurta",
      qty: 1,
      price: 1800,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <h1 className="text-3xl font-semibold text-primary mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* ADDRESSES */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">
                Delivery Address
              </h2>

              {!showForm && addresses.length < MAX_ADDRESSES && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-sm text-accent font-medium"
                >
                  + Add Address
                </button>
              )}
            </div>

            {/* ADDRESS LIST */}
            <div className="space-y-4">
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className={`border rounded-lg p-4 ${addr.isDefault
                      ? "border-accent bg-accent/5"
                      : ""
                    }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-primary">
                        {addr.name}
                        {addr.isDefault && (
                          <span className="text-xs text-green-600 ml-2">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {addr.phone}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefault(addr.id)}
                          className="text-accent"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(addr)}
                        className="text-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ADDRESS FORM */}
            {showForm && (
              <div className="mt-6">
                <Input
                  label="Address Label"
                  placeholder="Home / Office"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <Input
                  label="Full Address"
                  placeholder="Street, City, State, Pincode"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <Input
                  label="Phone Number"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <div className="flex gap-4">
                  <Button
                    title={editingId ? "Update Address" : "Save Address"}
                    onClick={handleSaveAddress}
                    className="max-w-xs"
                  />
                  <button
                    onClick={resetForm}
                    className="text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* CART ITEMS */}
          <Card>
            <h2 className="text-xl font-semibold text-primary mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <p>
                    {item.name} × {item.qty}
                  </p>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <Card className="h-fit">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Price Details
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>

            <div className="flex justify-between">
              <p>GST (5%)</p>
              <p>₹{gst}</p>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </div>

          <Button
            title="Place Order"
            className="mt-6"
            onClick={() => console.log("Order placed")}
          />
        </Card>
      </div>
    </div>
  );
}

export default Checkout;
