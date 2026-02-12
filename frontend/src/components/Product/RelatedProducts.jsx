import ProductCard from "../Product/ProductCard";

function RelatedProducts() {
  const products = [
    {
      id: 11,
      name: "Hand-painted Ceramic Bowl",
      price: 900,
      discount: 750, // selling price
      category: "Pottery",
      rating: 4.4,
      image:
        "https://img.freepik.com/free-photo/view-ancient-pottery-vessels-earthenware_23-2151538335.jpg",
    },
    {
      id: 12,
      name: "Decorative Blue Plate",
      price: 1100,
      discount: 950,
      category: "Pottery",
      rating: 4.5,
      image:
        "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
    },
    {
      id: 13,
      name: "Terracotta Flower Vase",
      price: 800,
      discount: 680,
      category: "Decor",
      rating: 4.2,
      image:
        "https://img.freepik.com/free-photo/view-ancient-pottery-vessels-earthenware_23-2151538335.jpg",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
