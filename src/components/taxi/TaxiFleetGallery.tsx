const FleetGallery = () => {
  const vehicles = [
    {
      name: "Sedan",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop",
    },
    {
      name: "SUV",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=300&fit=crop",
    },
    {
      name: "Luxury",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=500&h=300&fit=crop",
    },
    {
      name: "Innova",
      image:
        "https://images.unsplash.com/photo-1748215210950-536c6621629a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Tempo Traveller",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Our Fleet
        </h2>
        <div className="w-24 h-1 bg-emerald-600 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {vehicle.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FleetGallery;
