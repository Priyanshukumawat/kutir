import { Link } from "react-router-dom";
import Card from "../common/Card";

function CatalogueCard({ artisan }) {
  if (!artisan) return null;

  return (
    <Link to={`/catalogue/${artisan.id}`}>
      <Card className="group cursor-pointer overflow-hidden border hover:shadow-2xl transition-all duration-300 p-0 rounded-lg">

        {/* IMAGE */}
        <div className="relative h-52 w-full overflow-hidden rounded-lg">
          <img
            src={artisan.image}
            alt={artisan.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium border px-4 py-2 bg-black/40 backdrop-blur-sm">
              View Catalogue
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-2">
          <h3 className="font-semibold text-primary">
            {artisan.name}
          </h3>

          <p className="text-xs text-gray-500">
            {artisan.craft}
          </p>

          <p className="text-sm text-gray-400 mb-2">
            📍 {artisan.location}
          </p>


          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {artisan.about
              ? artisan.about.split(" ").slice(0, 20).join(" ") + "..."
              : ""}
          </p>

          <div className="flex items-center gap-1 text-sm text-yellow-600">
            {"★".repeat(Math.round(artisan.rating))}
            <span className="text-gray-500 ml-1">
              ({artisan.rating})
            </span>
          </div>


        </div>
      </Card>
    </Link>
  );
}

export default CatalogueCard;
