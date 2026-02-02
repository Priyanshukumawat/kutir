import { useState } from "react";
import Card from "../components/common/Card";
import { Link } from "react-router-dom";

function ArtisanProfile() {
  const artisan = {
    name: "Ramesh Kumar",
    craft: "Blue Pottery Artisan",
    location: "Jaipur, Rajasthan",
    rating: 4.8,
    banner:
      "https://images.unsplash.com/photo-1544717305-2782549b5136",
    story:
      "I have been practicing blue pottery for over two decades, keeping alive the traditional art form passed down in my family.",
  };

  const products = [
    {
      id: 1,
      name: "Blue Pottery Vase",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1582582429869-11f37c1c8d0b",
    },
    {
      id: 2,
      name: "Decorative Ceramic Plate",
      price: 900,
      image:
        "https://images.unsplash.com/photo-1601049676869-702ea24cfd58",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Banner */}
      <div
        className="h-60 rounded-2xl mb-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${artisan.banner})` }}
      />

      {/* Artisan Info */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-primary">
          {artisan.name}
        </h1>

        <p className="text-gray-600">
          {artisan.craft} • 📍 {artisan.location}
        </p>

        <p className="text-sm text-primary mt-2">
          ⭐ {artisan.rating}
        </p>

        <p className="mt-4 max-w-3xl text-gray-600">
          {artisan.story}
        </p>
      </div>

      {/* Product Catalogue */}
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Products by {artisan.name}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-xl mb-3"
              />

              <h3 className="font-medium text-primary">
                {product.name}
              </h3>

              <p className="font-semibold text-primary">
                ₹{product.price}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArtisanProfile;
