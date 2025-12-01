import React from "react";
import { FaTruck, FaShieldAlt, FaHandSparkles, FaFlag } from "react-icons/fa";

function MostLiked() {
  const liked = [
    {
      name: "Clay Mug",
      visits: 120,
      img: "https://www.zwende.com/cdn/shop/products/PDP-2_394a1b29-14d5-4582-81af-51ff9a87ece2_1800x1800.jpg?v=1674799333",
    },
    {
      name: "Handwoven Basket",
      visits: 98,
      img: "https://i.etsystatic.com/27262937/r/il/ea9903/3350190499/il_300x300.3350190499_ol0s.jpg",
    },
    {
      name: "Brass Earrings",
      visits: 85,
      img: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/23610564/2023/6/13/461d505c-5f24-4871-b728-c5a58fce403a1686630693223VoyllaGold-TonedContemporaryDropEarrings1.jpg",
    },
  ];

  const tags = [
    { icon: <FaTruck />, text: "Free Delivery Pan India" },
    { icon: <FaShieldAlt />, text: "Secure Payments" },
    { icon: <FaHandSparkles />, text: "Handmade Products" },
    { icon: <FaFlag />, text: "Vocal for Local" },
  ];

  return (
    <div className="py-14 bg-white">

      {/* TAGS FULL WIDTH */}
      <div className="w-full bg-[#FFF0C4]/40 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#660B05] p-4 rounded-xl border border-[#660B05]/20 shadow-sm hover:shadow-md transition"
            >
              <div className="text-[#FFF0C4] text-3xl mb-2">{tag.icon}</div>
              <p className="text-sm font-medium text-[#FFF0C4] text-center leading-tight">
                {tag.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION TITLE */}
      <h2 className="text-3xl text-center font-semibold text-[#3E0703] mb-10 mt-10">
        Most Liked Products
      </h2>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {liked.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#660B05]/20 hover:shadow-xl transition"
          >
            <img
              src={item.img}
              className="w-full h-52 object-cover"
              alt={item.name}
            />
            <div className="p-5">
              <h3 className="text-xl font-medium text-[#3E0703]">
                {item.name}
              </h3>
              <p className="text-[#8C1007] mt-2">{item.visits} Visits</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostLiked;
