"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const datax = [
  {
    id: 1,
    url: "chopta-tungnath-trek-package",
    images: "/adventures/tents and camp.jpg",
    name: "Chopta Tungnath Tour | Chopta Chandrashila",
    description:
      "There's no better way to connect with nature than trekking through the Himalayas and spending the night under the stars in cozy camping tents. With Explore Case, we bring you thrilling trekking experiences combined with safe camping stays at scenic spots across Uttarakhand and Himachal. Our trekking & camping packages are perfect for adventure enthusiasts, nature lovers, students, families, and groups who want a blend of adventure and peace.",
  },

  {
    id: 2,
    url: "valley-of-flowers-tour-package",
    images: "/adventures/Valley-of-Flowers.webp",
    name: "Valley of Flowers Trek",
    description:
      "The Valley of Flowers National Park, a UNESCO World Heritage Site, is one of the most stunning treks in India. Nestled in the Chamoli district of Uttarakhand, this breathtaking valley is famous for its endless meadows of alpine flowers, snow-clad peaks, and rare Himalayan wildlife. Located at an altitude of 3,658 meters, the valley is open only during the monsoon season (July to September), when thousands of colorful flowers bloom, making it a true paradise for nature lovers, photographers, and trekkers.",
  },
  {
    id: 3,
    url: "rishikesh-rafting-bungee-package",
    images: "/adventures/rafting.jpg",
    name: "Rishikesh River Rafting & Bungee Jumping Package",
    description:
      "Rishikesh, the Yoga Capital of the World, is also India's most popular destination for river rafting and adventure sports. Situated on the banks of the holy Ganga, it offers thrilling rafting rapids, scenic views of the Himalayas, and a blend of spirituality with adventure. At Explore Case, we provide safe and exciting Rishikesh rafting packages with certified guides, modern equipment, and flexible routes to suit beginners as well as adventure seekers.",
  },
  {
    id: 4,
    url: "jim-corbett-national-park-tour-package",
    images: "/adventures/jim corbett.webp",
    name: "Jim Corbett National Park Safari",
    description:
      "Jim Corbett National Park Safari Experience the thrill of exploring India's oldest national park, famous for its Royal Bengal Tigers, elephants, and rich wildlife. A perfect getaway for nature and adventure lovers, offering jeep safaris, bird watching, and serene forest stays.",
  },
  {
    id: 5,
    url: "auli-skiing-tour-package",
    images: "/adventures/auli.jpg",
    name: "Auli Skiing & Cable Car Tour",
    description:
      "Auli, located in Chamoli district of Uttarakhand, is a paradise for snow lovers and adventure seekers. Known as the Skiing Capital of India, it offers world-class skiing slopes, panoramic views of the Nanda Devi and Himalayan ranges, and the famous Auli Ropeway (cable car) - one of Asia's longest cable cars. With Explore Case, you can enjoy skiing, cable car rides, and breathtaking snow adventures in a safe and exciting way",
  },
  {
    id: 6,
    url: "harsil-tour-package-in-uttarakhand",
    images: "/adventures/harshil.webp",
    name: "Harshil Tour",
    description:
      "Escape to the hidden valley of Harsil, surrounded by apple orchards and Himalayan peaks. Explore Case offers curated stays, treks, and riverside bliss.",
  },
];

const AdventureTourDesigns = () => {
  const router = useRouter();
  return (
    <div className=" bg-gray-100">
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              Popular Adventure Tours
            </h2>
            <p className="text-emerald-600 text-lg max-w-2xl mx-auto">
              Discover breathtaking adventures and create unforgettable memories
              with our curated collection of tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {datax.map((tour, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={tour.images}
                    alt={tour.name}
                    width={1000}
                    height={1000}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300 flex items-center"
                      onClick={() => router.push(`/itinerary/${tour.url}`)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdventureTourDesigns;
