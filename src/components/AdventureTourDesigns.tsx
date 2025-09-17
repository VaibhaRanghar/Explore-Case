"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const datax = [
  {
    images: "/adventures/auli.jpg",
    name: "Auli Skiing & Cable Car Tour",
    description:
      "Auli, located in Chamoli district of Uttarakhand, is a paradise for snow lovers and adventure seekers. Known as the Skiing Capital of India, it offers world-class skiing slopes, panoramic views of the Nanda Devi and Himalayan ranges, and the famous Auli Ropeway (cable car) - one of Asia's longest cable cars. With Explore Case, you can enjoy skiing, cable car rides, and breathtaking snow adventures in a safe and exciting way",
  },
  {
    images: "/adventures/heli.jpg",
    name: "Char Dham Yatra by Helicopter",
    description:
      "Experience the sacred Char Dham Yatra in the most comfortable and time-saving way - by helicopter. This package is designed for devotees who wish to complete the Char Dham pilgrimage (Yamunotri, Gangotri, Kedarnath, and Badrinath) with ease, luxury, and personalized services. With helicopter services from Dehradun, Explore Case ensures a safe, quick, and spiritually fulfilling journey to the holy shrines.",
  },
  {
    images: "/adventures/rafting.jpg",
    name: "Rafting Adventure in Rishikesh",
    description:
      "Rishikesh, the Yoga Capital of the World, is also India's most popular destination for river rafting and adventure sports. Situated on the banks of the holy Ganga, it offers thrilling rafting rapids, scenic views of the Himalayas, and a blend of spirituality with adventure. At Explore Case, we provide safe and exciting Rishikesh rafting packages with certified guides, modern equipment, and flexible routes to suit beginners as well as adventure seekers.",
  },
  {
    images: "/adventures/tents and camp.jpg",
    name: "Thrilling treks with camp tents",
    description:
      "There's no better way to connect with nature than trekking through the Himalayas and spending the night under the stars in cozy camping tents. With Explore Case, we bring you thrilling trekking experiences combined with safe camping stays at scenic spots across Uttarakhand and Himachal. Our trekking & camping packages are perfect for adventure enthusiasts, nature lovers, students, families, and groups who want a blend of adventure and peace.",
  },
  {
    images: "/adventures/Valley-of-Flowers.webp",
    name: "Valley of Flowers Trek",
    description:
      "The Valley of Flowers National Park, a UNESCO World Heritage Site, is one of the most stunning treks in India. Nestled in the Chamoli district of Uttarakhand, this breathtaking valley is famous for its endless meadows of alpine flowers, snow-clad peaks, and rare Himalayan wildlife. Located at an altitude of 3,658 meters, the valley is open only during the monsoon season (July to September), when thousands of colorful flowers bloom, making it a true paradise for nature lovers, photographers, and trekkers.",
  },
];

const AdventureTourDesigns = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % datax.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + datax.length) % datax.length);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-16 px-4 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Epic Adventure Awaits</h2>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto">
              Journey through the most spectacular landscapes and create
              memories that last a lifetime
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {datax.map((tour, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative h-96 md:h-[500px]">
                      <Image
                        src={tour.images}
                        alt={tour.name}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/60 to-transparent"></div>

                      <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl mx-8 md:mx-16">
                          <h3 className="text-3xl md:text-5xl font-bold mb-4">
                            {tour.name}
                          </h3>
                          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                            {tour.description.substring(0, 200)}...
                          </p>

                          <div className="flex flex-wrap gap-4 mb-8">
                            <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400 text-emerald-100 px-4 py-2 rounded-full">
                              <MapPin className="w-4 h-4 inline mr-2" />
                              Uttarakhand
                            </span>
                            <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-400 text-emerald-100 px-4 py-2 rounded-full">
                              <Clock className="w-4 h-4 inline mr-2" />
                              3-7 Days
                            </span>
                          </div>

                          <button
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            onClick={() => router.push("/contact")}
                          >
                            Book Adventure
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-emerald-300/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-emerald-300/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-8 space-x-2">
              {datax.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-emerald-400" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdventureTourDesigns;
