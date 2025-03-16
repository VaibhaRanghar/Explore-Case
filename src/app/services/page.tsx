"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Compass, Briefcase, Car, Plane, Check } from "lucide-react";
import hotel from "../../../public/pexels-andrew-3201763.jpg";
import charDham from "../../../public/charDham.webp";
import car from "../../../public/haridwar-taxi.png";
import helicopter from "../../../public/helicopter.webp";

const services = [
  {
    title: "Char Dham Tour Packages",
    icon: Compass,
    image: charDham,
    alt: "Temple",
    points: [
      "Hassle-free premium Char Dham Yatra services.",
      "Cabs, hotels, and custom pilgrimage packages available.",
      "Safe, smooth, and memorable Himalayan journeys guaranteed.",
    ],
  },
  {
    title: "Hotel & Accommodation Booking",
    icon: Briefcase,
    image: hotel,
    alt: "Hotel Room",
    points: [
      "Premium accommodations",
      "Personalized concierge service",
      "Exclusive experiences and activities",
    ],
  },
  {
    title: "Cab & Transportation Services",
    icon: Car,
    image: car,
    alt: "Cab",
    points: [
      "Reliable cab services for seamless travel.",
      "Comfortable, safe journeys with professional drivers.",
      "Customized transportation options for all itineraries.",
    ],
  },
  {
    title: "Helicopter Service",
    icon: Plane,
    image: helicopter,
    alt: "Helicopter",
    points: [
      "Unparalleled aerial views and fast access to remote locations.",
      "Safe, reliable, personalized helicopter tours and transfers.",
      "Perfect for sightseeing, adventure, and efficient transport.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <h1 className="md:pl-24 text-4xl font-bold pl-16 mb-12 bg-emerald-600 text-white p-6 ">
        Our Services
      </h1>
      <div className=" container mx-auto  space-y-16">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  bg-emerald-50 rounded-lg sm: px-2 "
          >
            <div
              className={`space-y-4 pl-10 md:pl-6  ${
                index % 2 === 1 ? "md:order-2 " : ""
              }  sm: pt-5 pl-5 `}
            >
              <div className="flex items-center space-x-2">
                <service.icon className="w-8 h-8 text-emerald-600" />
                <h2 className="text-2xl font-semibold">{service.title}</h2>
              </div>
              <ul className="space-y-2 ">
                {service.points.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    className="flex items-center space-x-2 "
                  >
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative h-64 md:h-80 ${
                index % 2 === 1 ? "md:order-1" : ""
              }`}
            >
              <Image
                src={service.image || hotel}
                alt={service.alt}
                fill
                className="object-cover rounded-lg  shadow-lg shadow-slate-600 "
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
