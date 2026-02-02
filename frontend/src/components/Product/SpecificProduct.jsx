import { useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";

function SpecificProduct() {
  const product = {
    name: "Handmade Blue Pottery Vase",
    price: 1200,
    discount: 10,
    gst: 5,
    rating: 4.7,
    stock: 8,
    description:
      "This handmade blue pottery vase is crafted by skilled artisans of Jaipur using traditional techniques passed down generations.",
    artisan:
      "Crafted by local artisans from Jaipur, supporting rural craftsmanship and sustainable livelihoods.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-wB1FXKmQBoecbakQNgxhX_wCZy5a0c-RA&s",
      "https://media.istockphoto.com/id/511671282/photo/chinese-antique-vase.jpg?s=612x612&w=0&k=20&c=ILirHqv--RNKWxWBGZdZi1c_5E3IoSCt-BNbb2oWXyY=",
      "https://www.shutterstock.com/shutterstock/videos/1013914898/thumb/1.jpg?ip=x480",
    ],
  };

  const [activeImage, setActiveImage] = useState(product.images[0]);

  const finalPrice =
    product.price -
    (product.price * product.discount) / 100;

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGE GALLERY */}
        <div>
          <img
            src={activeImage}
            alt="Product"
            className="w-full h-[420px] object-cover rounded-2xl mb-4"
          />

          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="sub"
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  activeImage === img
                    ? "border-accent"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold text-primary mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mb-3">
            ⭐ {product.rating} • Handmade
          </p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-primary">
              ₹{finalPrice}
            </span>

            {product.discount > 0 && (
              <span className="text-sm line-through text-gray-400">
                ₹{product.price}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">
            GST: {product.gst}%
          </p>

          <p className="text-sm text-green-600 mb-6">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          <Button
            title="Add to Cart"
            className="max-w-xs"
          />

          {/* DESCRIPTION */}
          <Card className="mt-8">
            <h3 className="font-semibold text-primary mb-2">
              Product Description
            </h3>
            <p className="text-sm text-gray-600">
              {product.description}
            </p>
          </Card>

          {/* ARTISAN STORY */}
          <Card className="mt-6">
            <h3 className="font-semibold text-primary mb-2">
              Artisan Story
            </h3>
            <p className="text-sm text-gray-600">
              {product.artisan}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SpecificProduct;
