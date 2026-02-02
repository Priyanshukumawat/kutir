import Card from "../components/common/Card";
import Button from "../components/common/Button";

function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Handmade Blue Pottery",
      price: 1200,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1582582429869-11f37c1c8d0b",
    },
    {
      id: 2,
      name: "Khadi Cotton Kurta",
      price: 1800,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1520975922284-9e0ce82759c7",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 100;
  const total = subtotal + shipping;

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-8">
        Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <Card key={item.id} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="font-medium text-primary">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm">
                      Qty: {item.quantity}
                    </span>
                    <button className="text-sm text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </Card>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <Card>
            <h3 className="font-semibold text-primary mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Button title="Proceed to Checkout" />
          </Card>
        </div>
      )}
    </div>
  );
}

export default Cart;
