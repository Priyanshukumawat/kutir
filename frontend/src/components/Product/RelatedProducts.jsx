import { Link } from "react-router-dom";
import Card from "../common/Card";

function RelatedProducts() {
  const products = [
    {
      id: 11,
      name: "Hand-painted Ceramic Bowl",
      price: 750,
      image:
        "https://media.gettyimages.com/id/1694016405/video/man-painting-jaipurs-blue-pottery-rajasthan-india.jpg?s=640x640&k=20&c=7nIx0-dGsIGlDEwRyFOXwpZ-tyFMIuzuPkZNZd4jcB4=",
    },
    {
      id: 12,
      name: "Decorative Blue Plate",
      price: 950,
      image:
        "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
    },
    {
      id: 13,
      name: "Terracotta Flower Vase",
      price: 680,
      image:
        "https://img.freepik.com/free-photo/view-ancient-pottery-vessels-earthenware_23-2151538335.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full object-cover rounded-lg mb-3"
              />

              <h3 className="font-medium text-primary">
                {product.name}
              </h3>

              <p className="text-sm text-gray-600">
                ₹{product.price}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
