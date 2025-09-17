"use client";
import Marquee from "react-fast-marquee";

import SliderItem from "./SliderItem";

const datax = [
  { images: "/adventures/auli.jpg", name: "Auli Skiing & Cable Car Tour" },

  { images: "/adventures/heli.jpg", name: "Char Dham Yatra by Helicopter" },

  { images: "/adventures/rafting.jpg", name: "Rafting Adventure in Rishikesh" },

  {
    images: "/adventures/tents and camp.jpg",
    name: "Thrilling treks with camp tents",
  },

  {
    images: "/adventures/Valley-of-Flowers.webp",
    name: "Valley of Flowers Trek",
  },
];
function Adventures() {
  return (
    <div className="py-10 bg-emerald-50">
      <center>
        <h2 className="text-3xl font-bold px-5 mb-4">Popular Adventures Tours</h2>
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

export default Adventures;
