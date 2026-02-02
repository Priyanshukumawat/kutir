import { Link } from "react-router-dom";
import Card from "../common/Card";

function Product() {
  const products = [
    {
      id: 1,
      name: "Handmade Blue Pottery",
      price: 1200,
      discount: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-wB1FXKmQBoecbakQNgxhX_wCZy5a0c-RA&s",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Khadi Cotton Kurta",
      price: 1800,
      discount: 0,
      image:
        "https://img.faballey.com/images/Product/XKS13439A/4.jpg",
      rating: 4.4,
    },
  ];

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-semibold text-primary mb-8">
        Explore Handmade Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover rounded-xl mb-4"
              />

              <h2 className="font-medium text-primary mb-1">
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 mb-1">
                ⭐ {product.rating}
              </p>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">
                  ₹{product.price}
                </span>

                {product.discount > 0 && (
                  <span className="text-xs text-green-600">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Handcrafted by Indian artisans
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Product;
