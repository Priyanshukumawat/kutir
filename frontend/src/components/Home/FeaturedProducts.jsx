import React from 'react';

function FeaturedProducts() {
  const products = [
    { name: "Handmade Pottery", price: "Rs. 200/-", img: "https://tattvahandmade.com/cdn/shop/files/FEA533E3-BFD4-4A7B-8475-25C3265444EC_1_201_a_2048x.heic?v=1732518498" },
    { name: "Organic Cotton Kurta", price: "Rs. 400/-", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IsBJrZ-6UsR2BGgMQfZb0LlK8oZJG1YX5sF6wSbhx0t5EqLqjp2sp4XS0fNwDuB3SsU&usqp=CAU" },
    { name: "Wooden Lamp", price: "Rs. 550/-", img: "https://m.media-amazon.com/images/I/717-2TKJFGL.jpg" },
    { name: "Terracotta Jewelry", price: "Rs. 150/-", img: "https://m.media-amazon.com/images/I/91yCkwCawCL._AC_UY1100_.jpg" },
  ];

  return (
    <div className="py-14">
      <h2 className="text-3xl text-center font-semibold text-[#3E0703] mb-10">
        Featured Products
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4 border border-[#660B05]/20"
          >
            <img
              src={p.img}
              className="w-full h-48 object-cover rounded-md"
              alt={p.name}
            />
            <h3 className="mt-4 text-lg font-medium text-[#3E0703]">{p.name}</h3>
            <p className="text-[#8C1007] font-bold mt-1">{p.price}</p>
            <button className="mt-4 w-full bg-[#660B05] text-white py-2 rounded-lg hover:bg-[#8C1007] transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
