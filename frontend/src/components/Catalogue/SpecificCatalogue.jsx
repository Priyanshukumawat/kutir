import { useParams } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

function SpecificCatalogue() {
  const { id } = useParams();

  const artisan = {
    name: "Jaipur Blue Pottery",
    location: "Jaipur, Rajasthan",
    about:
      "Rooted in the heritage of Jaipur, our family has been crafting blue pottery for generations. Each piece is hand-moulded, hand-painted, and fired with care, keeping alive a timeless art form.",
    coverImage:
      "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
    products: [
      {
        id: 1,
        name: "Blue Pottery Vase",
        price: 1200,
        image:
          "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
      },
      {
        id: 2,
        name: "Decorative Ceramic Plate",
        price: 950,
        image:
          "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
      },
      {
        id: 3,
        name: "Hand-painted Bowl",
        price: 700,
        image:
          "https://media.gettyimages.com/id/1694016405/video/man-painting-jaipurs-blue-pottery-rajasthan-india.jpg?s=640x640&k=20&c=7nIx0-dGsIGlDEwRyFOXwpZ-tyFMIuzuPkZNZd4jcB4=",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* COVER + ARTISAN INFO */}
      <div className="relative w-full h-[420px] rounded-3xl overflow-hidden mb-14">
        {/* Cover Image */}
        <img
          src={artisan.coverImage}
          alt={artisan.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Text Content */}
        <div className="absolute bottom-8 left-8 right-8 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white mb-2">
            {artisan.name}
          </h1>

          <p className="text-sm text-cream mb-4">
            📍 {artisan.location}
          </p>

          <p className="text-sm text-gray-200 leading-relaxed">
            {artisan.about}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Handcrafted Creations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisan.products.map(product => (
            <Card
              key={product.id}
              className="hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover rounded-lg mb-4"
              />

              <h4 className="font-medium text-primary mb-1">
                {product.name}
              </h4>

              <p className="text-sm text-gray-600 mb-3">
                ₹{product.price}
              </p>

              <Button title="View Product" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpecificCatalogue;
