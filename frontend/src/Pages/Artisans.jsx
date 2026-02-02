import { Link } from "react-router-dom";
import Card from "../components/common/Card";

function Artisans() {
  const artisans = [
    {
      id: 1,
      name: "Ramesh Kumar",
      craft: "Blue Pottery Artisan",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
      story:
        "Crafting traditional blue pottery for over 20 years using ancestral techniques.",
    },
    {
      id: 2,
      name: "Sita Devi",
      craft: "Handloom Weaver",
      location: "Varanasi, UP",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
      story:
        "Specializes in handwoven khadi fabrics, empowering local women.",
    },
  ];

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-primary mb-8">
        Meet Our Artisans 🌾
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map(artisan => (
          <Link
            key={artisan.id}
            to={`/artisan/${artisan.id}`}
          >
            <Card className="hover:shadow-lg transition cursor-pointer">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="h-56 w-full object-cover rounded-xl mb-4"
              />

              <h2 className="font-semibold text-primary">
                {artisan.name}
              </h2>

              <p className="text-sm text-gray-500">
                {artisan.craft}
              </p>

              <p className="text-xs text-gray-400 mb-2">
                📍 {artisan.location}
              </p>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {artisan.story}
              </p>

              <p className="text-sm text-primary font-medium">
                ⭐ {artisan.rating}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Artisans;
