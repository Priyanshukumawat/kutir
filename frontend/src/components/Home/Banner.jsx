import React from "react";

function Banner() {
  const products = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhCT9s-By_13-mrSlAk2fzXPScD27Qm5lLA&s",
      title: "Handcrafted Vase",
      button: true,
    },
    {
      img: "https://i.etsystatic.com/27262937/r/il/ea9903/3350190499/il_300x300.3350190499_ol0s.jpg",
      title: "Handwoven Basket",
      button: false,
    },
    {
      img: "https://www.artsty.com/cdn/shop/files/3ce101eb-4d8d-4b54-92e9-155c16708355.jpg?v=1734870161",
      title: "Clay Mug",
      button: false,
    },
    {
      img: "https://brownliving.in/cdn/shop/files/siana-leaf-green-basket-handmade-eco-friendly-storage-basket-sianagreenleafbasketlarge-quilt-avenue-2778500.jpg?v=1759753534",
      title: "Organic Basket",
      button: true,
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSORuRJ-xG-AbnpY6vMnHswkH5RFDU5Xl19sA&s",
      title: "Artisan Earrings",
      button: false,
    },
    {
      img: "https://d13676iop780hb.cloudfront.net/uploads/2022/10/kcs-314-3.jpg",
      title: "Handloom Scarf",
      button: true,
    },
    {
      img: "https://thedecoindia.com/wp-content/uploads/2024/08/IMG_1053.png",
      title: "Brass Decor Piece",
      button: false,
    },
  ];

  return (
    <div className="w-full py-16 bg-white">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold text-center text-[#3E0703] mb-10">
        Kutir Handmade Collections
      </h2>

      {/* GRID LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] md:auto-rows-[190px] gap-4">

        {/* LARGE TILE */}
        <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[0].img}
            alt={products[0].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          {products[0].button && (
            <button className="absolute bottom-4 left-4 bg-[#660B05] text-[#FFF0C4] py-1.5 px-4 rounded-lg hover:bg-[#8C1007] transition shadow-lg">
              Shop Now
            </button>
          )}
        </div>

        {/* TILE 2 */}
        <div className="relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[1].img}
            alt={products[1].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

        {/* TILE 3 */}
        <div className="relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[2].img}
            alt={products[2].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

        {/* MEDIUM TALL TILE */}
        <div className="row-span-2 relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[3].img}
            alt={products[3].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          {products[3].button && (
            <button className="absolute bottom-4 left-4 bg-[#660B05] text-[#FFF0C4] py-1 px-3 rounded-lg shadow hover:bg-[#8C1007] transition text-sm">
              Shop
            </button>
          )}
        </div>

        {/* TILE 5 */}
        <div className="relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[4].img}
            alt={products[4].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

        {/* MEDIUM TALL TILE */}
        <div className="row-span-2 relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[5].img}
            alt={products[5].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          {products[5].button && (
            <button className="absolute bottom-4 left-4 bg-[#660B05] text-[#FFF0C4] py-1 px-3 rounded-lg shadow hover:bg-[#8C1007] transition text-sm">
              Shop
            </button>
          )}
        </div>

        {/* TILE 7 */}
        <div className="relative rounded-xl overflow-hidden group shadow-md">
          <img
            src={products[6].img}
            alt={products[6].title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        </div>

      </div>
    </div>
  );
}

export default Banner;
