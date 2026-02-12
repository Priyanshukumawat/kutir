import { useParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";

function SpecificCatalogue() {
  const { id } = useParams();
  console.log("Artisan ID:", id);

  const artisan = {
    id: "jaipur-blue-pottery",
    name: "Jaipur Blue Pottery",
    location: "Jaipur, Rajasthan",
    craft: "Traditional Blue Pottery",
    rating: 4.8,
    about:
      "Rooted in the heritage of Jaipur, our family has been crafting blue pottery for generations. Each piece is hand-moulded, hand-painted, and fired with care, keeping alive a timeless art form.",
    coverImage:
      "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",

    products: [
      {
        id: 1,
        name: "Blue Pottery Vase",
        price: 1200,
        discount: 1000,
        category: "Pottery",
        rating: 4.6,
        image:
          "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
      },
      {
        id: 2,
        name: "Decorative Ceramic Plate",
        price: 950,
        discount: 850,
        category: "Pottery",
        rating: 4.4,
        image:
          "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
      },
      {
        id: 3,
        name: "Hand-painted Bowl",
        price: 700,
        discount: 620,
        category: "Pottery",
        rating: 4.3,
        image:
          "https://media.gettyimages.com/id/1694016405/video/man-painting-jaipurs-blue-pottery-rajasthan-india.jpg?s=640x640&k=20&c=7nIx0-dGsIGlDEwRyFOXwpZ-tyFMIuzuPkZNZd4jcB4=",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* COVER IMAGE */}
      <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-lg">
        <img
          src={artisan.coverImage}
          alt={artisan.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ARTISAN DETAILS BELOW IMAGE */}
      <div className="mt-10 max-w-4xl">
        <h1 className="text-4xl font-semibold text-primary mb-3">
          {artisan.name}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>{artisan.craft}</span>
          <span>•</span>
          <span>📍 {artisan.location}</span>
          <span>•</span>
          <span className="text-yellow-600">
            ⭐ {artisan.rating}
          </span>
        </div>

        <div className="w-20 h-1 bg-accent rounded-full mb-6"></div>

        <p className="text-gray-700 leading-relaxed text-sm">
          {artisan.about}
        </p>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-primary mb-8">
          Handcrafted Creations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artisan.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default SpecificCatalogue;
