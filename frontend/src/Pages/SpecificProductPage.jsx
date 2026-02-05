import ProductDetails from "../components/Product/ProductDetails";
import ProductReviews from "../components/Product/ProductReviews";
import RelatedProducts from "../components/Product/RelatedProducts";

function SpecificProductPage() {
  return (
    <div className="">
      {/* Product Main Section */}
      <ProductDetails />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Reviews */}
        <ProductReviews />

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  );
}

export default SpecificProductPage;
