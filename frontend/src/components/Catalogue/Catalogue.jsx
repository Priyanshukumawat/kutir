import CatalogueCard from "./CatalogueCard";

function Catalogue() {
  const artisans = [
    {
      id: "jaipur-blue-pottery",
      name: "Jaipur Blue Pottery",
      craft: "Traditional Blue Pottery",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      image:
        "https://ebnw.net/wp-content/uploads/2020/11/Blue-Pottery-1.jpg",
      about:
        "Rooted in the royal heritage of Jaipur, this family-run workshop has been crafting blue pottery for over three generations. Every piece is hand-moulded and hand-painted using age-old techniques."
    },
    {
      id: "kutch-handloom",
      name: "Kutch Handloom",
      craft: "Handwoven Textiles",
      location: "Kutch, Gujarat",
      rating: 4.6,
      image:
        "https://media.gettyimages.com/id/541514483/photo/traditional-artistic-navratri-dressing-gujarat.jpg?s=612x612&w=0&k=20&c=_E1DiAXEVcG-YdDHeMzKDzOgT0oAJs2rfB72Lwop8Ac=",
      about:
        "Kutch Handloom preserves centuries-old weaving traditions of Gujarat. Their vibrant textiles are handcrafted using natural dyes and traditional pit looms."
    },
    {
      id: "assam-cane-craft",
      name: "Assam Cane Craft",
      craft: "Bamboo & Cane Craft",
      location: "Assam",
      rating: 4.7,
      image:
        "https://www.shutterstock.com/image-photo/guwahati-assam-indianov-29-2021-600nw-2244297657.jpg",
      about:
        "From the lush landscapes of Assam, this artisan collective creates sustainable bamboo and cane products that blend eco-conscious living with traditional craftsmanship."
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
