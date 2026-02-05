import { Link } from "react-router-dom";
import Card from "../common/Card";

function CatalogueCard({ artisan }) {
  return (
    <Link to={`/catalogue/${artisan.id}`}>
      <Card className="cursor-pointer hover:shadow-xl transition overflow-hidden">
        <img
          src={artisan.banner}
          alt={artisan.name}
          className="h-44 w-full object-cover"
        />

        <div className="pt-4">
          <h3 className="text-lg font-semibold text-primary">
            {artisan.name}
          </h3>

          <p className="text-sm text-gray-600">
            {artisan.location}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {artisan.speciality}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default CatalogueCard;
