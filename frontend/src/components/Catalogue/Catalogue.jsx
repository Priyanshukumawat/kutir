import CatalogueCard from "./CatalogueCard";

function Catalogue() {
  const artisans = [
    {
      id: "jaipur-blue-pottery",
      name: "Jaipur Blue Pottery",
      location: "Jaipur, Rajasthan",
      speciality: "Traditional Blue Pottery",
      banner:
        "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
    },
    {
      id: "kutch-handloom",
      name: "Kutch Handloom",
      location: "Kutch, Gujarat",
      speciality: "Handwoven Textiles",
      banner:
        "https://media.gettyimages.com/id/541514483/photo/traditional-artistic-navratri-dressing-gujarat.jpg?s=612x612&w=0&k=20&c=_E1DiAXEVcG-YdDHeMzKDzOgT0oAJs2rfB72Lwop8Ac=",
    },
    {
      id: "assam-cane-craft",
      name: "Assam Cane Craft",
      location: "Assam",
      speciality: "Bamboo & Cane Craft",
      banner:
        "https://www.shutterstock.com/image-photo/guwahati-assam-indianov-29-2021-600nw-2244297657.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {artisans.map(artisan => (
        <CatalogueCard
          key={artisan.id}
          artisan={artisan}
        />
      ))}
    </div>
  );
}

export default Catalogue;
