"use client";
import Marquee from "react-fast-marquee";

import SliderItem from "./SliderItem";

const datax = [
  { images: "/slider/kedarnath.webp", name: "Kedarnath" },

  { images: "/slider/badrinath.webp", name: "Badrinath" },

  { images: "/slider/chopta.webp", name: "Chopta" },

  { images: "/slider/nainital.webp", name: "Nainital" },

  { images: "/slider/dhanaulti.webp", name: "Mussorie & Dhanaulti" },

  { images: "/slider/auli.webp", name: "Auli" },

  { images: "/slider/rishikesh.webp", name: "Haridwar & Rishikesh" },
];

function CarouselSlider() {
  return (
    <div className="py-10 bg-emerald-50">
      <center>
        <h2 className="text-3xl font-bold mb-4">
          Our Uttarakhand Tour Packages
        </h2>
      </center>
      <ul className="w-4/5 m-auto">
        <Marquee pauseOnHover speed={100} className="gap-6">
          {datax.map((item, index) => (
            <SliderItem key={index} images={item.images} name={item.name} />
          ))}
        </Marquee>
      </ul>
    </div>
  );
}

export default CarouselSlider;
