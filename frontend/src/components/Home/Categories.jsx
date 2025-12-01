import React from 'react';

function Categories() {
  const categories = [
    { title: "Handmade Crafts", img: "https://cdn.shopify.com/s/files/1/0030/9759/1872/collections/EL-005-670_C_21b94a9a-9a6c-4cda-95c3-25e69ff3c443_480x.jpg?v=1736166058" },
    { title: "Clothing", img: "https://myhandicraftindia.com/wp-content/uploads/2024/05/my-handicraft-india-2.jpeg" },
    { title: "Home Decor", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEQFnbW45UYdaPYyWSW2qBjKKqeuonaoRpsDmQBWlRsq9CX5WmyoePlZODMsGPLp54E_E&usqp=CAU" },
    { title: "Jewelry", img: "https://i.pinimg.com/736x/e4/39/5f/e4395f002c1393173d0948be1ca36d88.jpg" },
  ];

  return (
    <div className="py-12 flex flex-col gap-10 bg-[#ffff]">
      <h2 className="text-3xl text-center font-semibold text-[#3E0703] mb-8">
        Shop by Categories
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 duration-300"
          >
            <img src={cat.img} className="w-full h-40 object-cover" alt={cat.title} />
            <p className="text-center py-3 font-medium text-[#3E0703]">
              {cat.title}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full h-52 bg-[#FFF0C4]/40 flex items-center justify-center">
        <h2 className="text-4xl text-[#660B05] font-semibold tracking-wide">
          Uplifting Local Artisans • Shop Handmade
        </h2>
      </div>
    </div>
  );
}

export default Categories;
