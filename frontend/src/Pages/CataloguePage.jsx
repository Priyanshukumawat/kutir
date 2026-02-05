import Catalogue from "../components/Catalogue/Catalogue";

function CataloguePage() {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-primary mb-4 text-center">
        Artisan Catalogues
      </h1>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore handcrafted collections directly from Indian artisans,
        preserving heritage, culture, and craftsmanship.
      </p>

      <Catalogue />
    </div>
  );
}

export default CataloguePage;
