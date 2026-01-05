const CarTypesTable = () => {
  const carTypes = [
    {
      type: "AC Hatchbacks",
      models: "Ritz, Indica, Micra etc.",
      passengers: "4",
      idealFor: "Economical rides for a few miles",
    },
    {
      type: "AC Sedans",
      models: "Amaze, Etios, Dzire etc.",
      passengers: "4",
      idealFor: "Comfortable passengers with small groups of travellers",
    },
    {
      type: "Luxury Car Rental",
      models: "Camry, Corolla, BMW etc.",
      passengers: "4",
      idealFor: "Indulging in luxury travel",
    },
    {
      type: "AC SUVs & MUVs",
      models: "Ertiga, Innova, Xylo etc.",
      passengers: "6/7",
      idealFor: "Luxury travel for the big family",
    },
    {
      type: "Premium SUVs",
      models: "Innova Crysta",
      passengers: "6/7",
      idealFor: "Best for a group of 6 to 7 people",
    },
    {
      type: "AC Minivans",
      models: "Tempo Travellers",
      passengers: "12",
      idealFor: "Accommodating large groups of friends and families",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Ideal Cab Selection
        </h2>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-emerald-500 text-white">
                <th className="py-4 px-6 text-left font-semibold border border-emerald-600">
                  Car Type
                </th>
                <th className="py-4 px-6 text-left font-semibold border border-emerald-600">
                  Models Included
                </th>
                <th className="py-4 px-6 text-left font-semibold border border-emerald-600">
                  Passengers
                </th>
                <th className="py-4 px-6 text-left font-semibold border border-emerald-600">
                  Ideal For
                </th>
              </tr>
            </thead>
            <tbody>
              {carTypes.map((car, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="py-4 px-6 border border-gray-300 font-semibold">
                    {car.type}
                  </td>
                  <td className={`py-4 px-6 border border-gray-300 `}>
                    {car.models}
                  </td>
                  <td className="py-4 px-6 border border-gray-300">
                    {car.passengers}
                  </td>
                  <td className="py-4 px-6 border border-gray-300">
                    {car.idealFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {carTypes.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500"
            >
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                {car.type}
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Models:</span> {car.models}
                </p>
                <p>
                  <span className="font-semibold">Passengers:</span>{" "}
                  {car.passengers}
                </p>
                <p>
                  <span className="font-semibold">Ideal For:</span>{" "}
                  {car.idealFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CarTypesTable;
