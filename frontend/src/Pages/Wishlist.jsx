import Card from "../components/common/Card";
import Button from "../components/common/Button";

function Wishlist() {
  const wishlist = [
    {
      id: 1,
      name: "Handmade Blue Pottery",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1582582429869-11f37c1c8d0b",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Khadi Cotton Kurta",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1520975922284-9e0ce82759c7",
      rating: 4.4,
    },
  ];

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-8">
        Your Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <Card key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover rounded-xl mb-4"
              />

              <h2 className="font-medium text-primary mb-1">
                {item.name}
              </h2>

              <p className="text-sm text-gray-500 mb-1">
                ⭐ {item.rating}
              </p>

              <p className="font-semibold text-primary mb-4">
                ₹{item.price}
              </p>

              <div className="flex gap-3">
                <Button title="Move to Cart" />
                <button className="text-sm text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
