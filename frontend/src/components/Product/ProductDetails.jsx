import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const product = {
    id: 1,
    name: "Handmade Blue Pottery Vase",
    price: 1200,
    discount: 10,
    gst: 5,
    rating: 4.7,
    reviews: 128,
    stock: 8,
    description:
      "This handmade blue pottery vase is crafted by skilled artisans of Jaipur using traditional techniques passed down through generations. Each piece is unique and hand-painted.",
    artisan:
      "Crafted by local artisans from Jaipur, supporting rural craftsmanship and sustainable livelihoods.",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-wB1FXKmQBoecbakQNgxhX_wCZy5a0c-RA&s",
      "https://media.istockphoto.com/id/511671282/photo/chinese-antique-vase.jpg?s=612x612&w=0&k=20&c=ILirHqv--RNKWxWBGZdZi1c_5E3IoSCt-BNbb2oWXyY=",
      "https://www.shutterstock.com/shutterstock/videos/1013914898/thumb/1.jpg?ip=x480",
    ],
  };

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [qty, setQty] = useState(1);

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const gstAmount = (discountedPrice * product.gst) / 100;
  const finalPrice = discountedPrice + gstAmount;

  const handleAddToCart = () => {
    console.log("Added to cart:", product.id, qty);
  };

  const handleBuyNow = () => {
    console.log("Buy now:", product.id, qty);
    navigate('/checkout')
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* IMAGE GALLERY */}
        <div>
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-[460px] object-cover rounded-2xl mb-4"
          />

          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="product"
                onClick={() => setActiveImage(img)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${activeImage === img
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

          <p className="text-sm text-gray-600 mb-2">
            ⭐ {product.rating} ({product.reviews} reviews) • Handmade
          </p>

          {/* PRICE */}
          <div className="flex items-end gap-4 mb-4">
            <span className="text-3xl font-bold text-primary">
              ₹{Math.round(finalPrice)}
            </span>

            <span className="text-sm line-through text-gray-400">
              ₹{product.price}
            </span>

            <span className="text-sm text-green-600 font-medium">
              {product.discount}% OFF
            </span>
          </div>

          {/* PRICE BREAKUP */}
          <p className="text-sm text-gray-600 mb-1">
            GST ({product.gst}%): ₹{Math.round(gstAmount)}
          </p>

          <p className="text-sm text-green-600 mb-4">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => qty > 1 && setQty(qty - 1)}
                className="px-3 py-1"
              >
                −
              </button>
              <span className="px-4">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex gap-4 mb-8">
            <Button
              title="Add to Cart"
              onClick={handleAddToCart}
              className="flex-1"
            />

            <button
              onClick={handleBuyNow}
              className="flex-1 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-hover transition"
            >
              Buy Now
            </button>
          </div>

          {/* TRUST INFO */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
            <span>✔ 100% Handmade</span>
            <span>✔ Secure Payments</span>
            <span>✔ Easy Returns</span>
            <span>✔ Artisan Direct</span>
          </div>

          {/* DESCRIPTION */}
          <Card className="mb-6">
            <h3 className="font-semibold text-primary mb-2">
              Product Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </Card>

          {/* ARTISAN STORY */}
          <Card>
            <h3 className="font-semibold text-primary mb-2">
              Artisan Story
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.artisan}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
