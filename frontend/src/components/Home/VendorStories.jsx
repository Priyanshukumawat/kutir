import React from "react";
import { Link } from "react-router-dom";

function VendorStories() {
  const stories = [
    {
      name: "Aarav Sharma",
      location: "Jaipur, Rajasthan",
      story:
        "Kutir helped me bring my handmade pottery to customers across India. Their support and platform visibility changed my small workshop into a sustainable business.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcS7j-Xdsq4sRJkGGqzoss2J71iPMnUTChjQ&s",
      rating: 5,
    },
    {
      name: "Meera Handlooms",
      location: "Kanchipuram, Tamil Nadu",
      story:
        "After joining Kutir, my handloom sarees started reaching customers who truly value craftsmanship. The vendor support team is amazing.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo-kmWYo_LWgh9FXElKdlCHTiILS4c12QRuA&s",
      rating: 5,
    },
    {
      name: "Organic Roots Farm",
      location: "Assam",
      story:
        "Kutir gave us a platform to sell organic and traditional products globally. It's a blessing for small and local businesses.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3jbHQ5h_sqJXuIEPrgr2IA1FpdHHGT4aedA&s",
      rating: 4,
    },
  ];

  return (
    <div className="py-16 bg-[#FFF0C4]/40">
      <h2 className="text-3xl font-semibold text-center text-[#3E0703] mb-10">
        Vendor Stories & Feedback
      </h2>

      <p className="text-center max-w-3xl mx-auto text-[#3E0703]/80 mb-12">
        Real stories from artisans and small businesses thriving with Kutir.
        Every product has a soul, and every vendor has a journey worth sharing.
      </p>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {stories.map((v, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-[#660B05]/20 p-6 hover:shadow-xl transition"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={v.img}
                alt={v.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#FFF0C4] shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold text-[#3E0703]">
                {v.name}
              </h3>
              <p className="text-sm text-[#660B05]/70 mb-3">{v.location}</p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(v.rating)].map((_, i) => (
                  <span key={i} className="text-[#8C1007] text-lg">★</span>
                ))}
                {[...Array(5 - v.rating)].map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">★</span>
                ))}
              </div>

              {/* Story */}
              <p className="text-[#3E0703]/80 text-sm leading-relaxed">
                “{v.story}”
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          to="/vendor/register"
          className="bg-[#660B05] text-[#FFF0C4] px-8 py-3 rounded-lg text-lg shadow-md hover:bg-[#8C1007] transition inline-block"
        >
          Become a Vendor
        </Link>
      </div>
    </div>
  );
}

export default VendorStories;
