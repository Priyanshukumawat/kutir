import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../common/Card";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) return null;

  const originalPrice = product.price;
  const sellingPrice = product.discount; // 👈 actual selling price

  const discountPercent =
    sellingPrice < originalPrice
      ? Math.round(
        ((originalPrice - sellingPrice) / originalPrice) * 100
      )
      : 0;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted(prev => !prev);
  };

  return (
    <Card
      padding="p-0"
      className="group overflow-hidden transition hover:shadow-xl rounded-none border cursor-default"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full h-full object-cover hover:scale-105 transition-transform "
        />

        {/* WISHLIST */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-cream transition"
        >
          {wishlisted ? (
            <AiFillHeart className="text-red-600 text-lg" />
          ) : (
            <FiHeart className="text-primary text-lg" />
          )}
        </button>
      </div>

      {/* DETAILS (NAVIGATE TO PRODUCT) */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="p-4 flex flex-col  cursor-pointer"
      >
        <h3 className="font-medium text-primary line-clamp-2 min-h-[30px]">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>

        {/* RATINGS */}
        <div className="flex items-center gap-1 text-sm text-yellow-600">
          {"★".repeat(Math.round(product.rating))}
          <span className="text-gray-500 ml-1">
            ({product.rating})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          {/* SELLING PRICE */}
          <span className="text-lg font-semibold text-primary">
            ₹{sellingPrice}
          </span>

          {/* ORIGINAL PRICE + DISCOUNT */}
          {discountPercent > 0 && (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{originalPrice}
              </span>
              <span className="text-xs text-green-600 font-medium">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      {/* BUY NOW */}
      <div className="overflow-hidden">
        <button
          onClick={() => navigate("/checkout")}
          className="
      w-full 
      bg-accent 
      text-white 
      py-2 
      text-sm 
      font-medium 
      hover:bg-hover 
      transition-all 
      duration-300
      opacity-0 
      translate-y-3
      group-hover:opacity-100 
      group-hover:translate-y-0
    "
        >
          Buy Now
        </button>
      </div>

    </Card>
  );
}

export default ProductCard;
