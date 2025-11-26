import toursData from "@/data/itinerary.json";
function getAllPackages() {
  return toursData;
}

function getPackageById(id: string) {
  const data = toursData.filter((tour) => tour.id.toString() === id);
  if (data.length === 0) return null;
  return data[0];
}

function getPackageByURL(url: string) {
  const data = toursData.filter((tour) => tour.url.toString() === url);
  if (data.length === 0) return null;
  return data[0];
}
function getPackagesList() {
  const data = getAllPackages();
  const list = data.map((tour) => ({
    id: tour.id,
    name: tour.tourName,
    price: tour.price,
  }));
  return list;
}

function getPriceRange(priceArray: string[] | undefined): string[] {
  if (!Array.isArray(priceArray) || priceArray.length === 0) {
    return [""];
  }

  // Extract first and last range
  const firstRange = priceArray[0].match(/₹([\d,]+)/);
  const lastRange = priceArray[priceArray.length - 1].match(/₹([\d,]+)/g);

  if (!firstRange || !lastRange) return [""];

  const minPrice = firstRange[1];
  const maxPrice = lastRange[lastRange.length - 1];

  return new Array(`₹${minPrice} - ${maxPrice}`);
}
export {
  getAllPackages,
  getPackageById,
  getPackageByURL,
  getPackagesList,
  getPriceRange,
};
