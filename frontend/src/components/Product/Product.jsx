import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiFilter, FiGrid, FiColumns } from "react-icons/fi";
import ProductCard from "./ProductCard";

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Handmade Blue Pottery Vase",
    price: 1200,
    discount: 1000,
    category: "Pottery",
    artisan: "Jaipur Crafts",
    color: "Blue",
    rating: 4.6,
    image: "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
  },
  {
    id: 2,
    name: "Decorative Ceramic Plate",
    price: 950,
    discount: 800,
    category: "Pottery",
    artisan: "Jaipur Crafts",
    color: "Multicolor",
    rating: 4.4,
    image: "https://www.shutterstock.com/image-photo/jaipur-2021-handicraft-blue-pottryrajasthanindia-600nw-2083948726.jpg",
  },
  {
    id: 3,
    name: "Khadi Cotton Kurta",
    price: 1800,
    discount: 1700,
    category: "Apparel",
    artisan: "Kutch Weaves",
    color: "Brown",
    rating: 4.5,
    image: "https://img.faballey.com/images/Product/XKS13439A/4.jpg",
  },
  {
    id: 4,
    name: "Handloom Dupatta",
    price: 750,
    discount: 650,
    category: "Apparel",
    artisan: "Bengal Clay",
    color: "Multicolor",
    rating: 4.2,
    image: "https://img.perniaspopupshop.com/catalog/product/z/a/ZALB122262_1.jpg",
  },
  {
    id: 5,
    name: "Wooden Toy Set",
    price: 600,
    discount: 400,
    category: "Toys",
    artisan: "Jaipur Crafts",
    color: "Brown",
    rating: 4.3,
    image: "https://thumbs.dreamstime.com/b/pinnochio-marionette-wall-photography-42066882.jpg",
  },
  {
    id: 6,
    name: "Brass Diya",
    price: 450,
    discount: 250,
    category: "Decor",
    artisan: "Bengal Clay",
    color: "Gold",
    rating: 4.1,
    image: "https://imagescdn.jaypore.com/img/app/product/3/39733347-15721578.jpg",
  },
  {
    id: 7,
    name: "Terracotta Planter",
    price: 850,
    discount: 650,
    category: "Pottery",
    artisan: "Jaipur Crafts",
    color: "Brown",
    rating: 4.6,
    image: "https://peacenjoy.in/cdn/shop/files/WAmgHmnV_o.png",
  },
  {
    id: 8,
    name: "Handwoven Basket",
    price: 520,
    discount: 320,
    category: "Decor",
    artisan: "Kutch Weaves",
    color: "Brown",
    rating: 4.0,
    image: "https://i.pinimg.com/736x/33/2d/1c/332d1cf26d0825aee0882e64fd29f019.jpg",
  },
  {
    id: 9,
    name: "Clay Tea Cups",
    price: 390,
    discount: 100,
    category: "Pottery",
    artisan: "Bengal Clay",
    color: "Brown",
    rating: 4.2,
    image: "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/IMG_9330.jpg",
  },
  {
    id: 10,
    name: "Handcrafted Necklace",
    price: 1100,
    discount: 1000,
    category: "Jewellery",
    artisan: "Jaipur Crafts",
    color: "Multicolor",
    rating: 4.5,
    image: "https://aashirs.com/cdn/shop/files/MulticoloredLacNecklaceandEarringSet-3.png",
  },
];

const PAGE_SIZE = 6;

/* ---------------- COMPONENT ---------------- */
function Product() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedArtisans, setSelectedArtisans] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState("default");
  const [gridCols, setGridCols] = useState(4);
  const [page, setPage] = useState(1);

  const categories = ["Pottery", "Apparel", "Decor", "Toys", "Jewellery"];
  const artisans = ["Jaipur Crafts", "Kutch Weaves", "Bengal Clay"];
  const colors = ["Blue", "Brown", "Gold", "Multicolor"];

  /* ---------------- HELPERS ---------------- */
  const toggleValue = (value, setter) => {
    setPage(1);
    setter(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  /* ---------------- FILTER + SORT ---------------- */
  const filteredProducts = useMemo(() => {
    let data = [...ALL_PRODUCTS];

    if (selectedCategories.length)
      data = data.filter(p => selectedCategories.includes(p.category));

    if (selectedArtisans.length)
      data = data.filter(p => selectedArtisans.includes(p.artisan));

    if (selectedColors.length)
      data = data.filter(p => selectedColors.includes(p.color));

    data = data.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (sortBy === "az") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "za") data.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "rating") data.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [
    selectedCategories,
    selectedArtisans,
    selectedColors,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-primary">
          Explore Handmade Products
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-cream"
          >
            <FiFilter /> Filters
          </button>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="default">Sort</option>
            <option value="az">A – Z</option>
            <option value="za">Z – A</option>
            <option value="rating">Popular</option>
            <option value="price-low">Price ↑</option>
            <option value="price-high">Price ↓</option>
          </select>

          <button
            onClick={() => setGridCols(2)}
            className={`p-2 border rounded-lg ${gridCols === 2 ? "bg-accent text-white" : ""}`}
          >
            <FiColumns />
          </button>

          <button
            onClick={() => setGridCols(4)}
            className={`p-2 border rounded-lg ${gridCols === 4 ? "bg-accent text-white" : ""}`}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${filtersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 space-y-5">
          <div className="flex justify-between">
            <h3 className="font-semibold text-primary">Filters</h3>
            <button onClick={() => setFiltersOpen(false)}>✕</button>
          </div>

          {/* CATEGORIES */}
          <div>
            <p className="font-medium mb-2">Categories</p>
            {categories.map(c => (
              <label key={c} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleValue(c, setSelectedCategories)}
                />
                {c}
              </label>
            ))}
          </div>

          {/* ARTISANS */}
          <div>
            <p className="font-medium mb-2">Artisans</p>
            {artisans.map(a => (
              <label key={a} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedArtisans.includes(a)}
                  onChange={() => toggleValue(a, setSelectedArtisans)}
                />
                {a}
              </label>
            ))}
          </div>

          {/* COLORS */}
          <div>
            <p className="font-medium mb-2">Colors</p>
            {colors.map(c => (
              <label key={c} className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c)}
                  onChange={() => toggleValue(c, setSelectedColors)}
                />
                {c}
              </label>
            ))}
          </div>

          {/* PRICE */}
          <div>
            <p className="font-medium mb-2">Price Range</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="w-1/2 border rounded-lg px-2 py-1 text-sm"
              />
            </div>
          </div>

          {/* CLEAR */}
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedArtisans([]);
              setSelectedColors([]);
              setMinPrice(0);
              setMaxPrice(3000);
              setSortBy("default");
            }}
            className="w-full py-2 border rounded-lg text-sm hover:bg-cream"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setFiltersOpen(false)}
        />
      )}

      {/* PRODUCTS GRID */}
      <div
        className={`grid gap-6 transition-all duration-300 ${gridCols === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
      >
        {paginatedProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-accent text-white" : "bg-cream"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
