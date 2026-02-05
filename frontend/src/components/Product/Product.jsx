import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Handmade Blue Pottery Vase",
    price: 1200,
    category: "Pottery",
    rating: 4.6,
    image: "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
  },
  {
    id: 2,
    name: "Decorative Ceramic Plate",
    price: 950,
    category: "Pottery",
    rating: 4.4,
    image: "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
  },
  {
    id: 3,
    name: "Khadi Cotton Kurta",
    price: 1800,
    category: "Apparel",
    rating: 4.5,
    image: "https://img.faballey.com/images/Product/XKS13439A/4.jpg",
  },
  {
    id: 4,
    name: "Handloom Dupatta",
    price: 750,
    category: "Apparel",
    rating: 4.2,
    image: "https://img.perniaspopupshop.com/catalog/product/z/a/ZALB122262_1.jpg?impolicy=zoomimage",
  },
  {
    id: 5,
    name: "Wooden Toy Set",
    price: 600,
    category: "Toys",
    rating: 4.3,
    image: "https://thumbs.dreamstime.com/b/pinnochio-marionette-wall-photography-42066882.jpg",
  },
  {
    id: 6,
    name: "Brass Diya",
    price: 450,
    category: "Decor",
    rating: 4.1,
    image: "https://imagescdn.jaypore.com/img/app/product/3/39733347-15721578.jpg?w=500&auto=format",
  },
  {
    id: 7,
    name: "Terracotta Planter",
    price: 850,
    category: "Pottery",
    rating: 4.6,
    image: "https://peacenjoy.in/cdn/shop/files/WAmgHmnV_o.png?v=1746470892&width=1445",
  },
  {
    id: 8,
    name: "Handwoven Basket",
    price: 520,
    category: "Decor",
    rating: 4.0,
    image: "https://i.pinimg.com/736x/33/2d/1c/332d1cf26d0825aee0882e64fd29f019.jpg",
  },
  {
    id: 9,
    name: "Clay Tea Cups",
    price: 390,
    category: "Pottery",
    rating: 4.2,
    image: "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/IMG_9330_56287162-b8c5-4c0d-9b8a-63e7cabc5eab.jpg?v=1768565816",
  },
  {
    id: 10,
    name: "Handcrafted Necklace",
    price: 1100,
    category: "Jewellery",
    rating: 4.5,
    image: "https://aashirs.com/cdn/shop/files/MulticoloredLacNecklaceandEarringSet-3.png?v=1749281282",
  },
];

const PAGE_SIZE = 6;

function Product() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  const categories = ["Pottery", "Apparel", "Decor", "Toys", "Jewellery"];

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let data = [...ALL_PRODUCTS];

    if (selectedCategories.length > 0) {
      data = data.filter(p =>
        selectedCategories.includes(p.category)
      );
    }

    if (sortBy === "price-low") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    return data;
  }, [selectedCategories, sortBy]);

  // PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const toggleCategory = (cat) => {
    setPage(1);
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-primary mb-8">
        Explore Handmade Products
      </h1>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* FILTERS */}
        <div>
          <Card>
            <h3 className="font-semibold text-primary mb-4">
              Filters
            </h3>

            <p className="text-sm font-medium mb-2">
              Categories
            </p>

            <div className="space-y-2">
              {categories.map(cat => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <hr className="my-4" />

            <p className="text-sm font-medium mb-2">
              Sort By
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </Card>
        </div>

        {/* PRODUCTS */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="hover:shadow-xl transition cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover rounded-lg mb-3"
                  />

                  <h2 className="font-medium text-primary">
                    {product.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    ⭐ {product.rating}
                  </p>

                  <p className="font-semibold text-primary mt-1">
                    ₹{product.price}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {product.category}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm ${page === i + 1
                    ? "bg-accent text-white"
                    : "bg-cream text-primary"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
