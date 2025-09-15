"use client";
import Marquee from "react-fast-marquee";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import SliderItem from "./SliderItem";

// const data = [
//   {
//     images: "/bookNow.svg",
//     name: "Location Name",
//     nights: "3",
//     days: "4",
//     discountedPrice: "15,000",
//     price: "48,500",
//   },
// ];

const datax = [
  { images: "/slider/kedarnath.webp", name: "Kedarnath" },

  { images: "/slider/badrinath.webp", name: "Badrinath" },

  { images: "/slider/chopta.webp", name: "Chopta" },

  { images: "/slider/nainital.webp", name: "Nainital" },

  { images: "/slider/dhanaulti.webp", name: "Mussorie & Dhanaulti" },

  { images: "/slider/auli.webp", name: "Auli" },

  { images: "/slider/rishikesh.webp", name: "Haridwar & Rishikesh" },
];
// function CarouselSlider() {
//   return (
//     <div>
//       <center>
//         <h1 className="text-3xl font-bold mb-4">
//           Our Uttarakhand Tour Packages
//         </h1>
//       </center>

//       <div className="w-4/5 mx-auto ">
//         <Carousel className="p-10" aria-activedescendant="">
//           <CarouselPrevious />
//           <CarouselContent className="-ml-4 ">
//             {data.map((item, index) => (
//               <CarouselItem
//                 key={index}
//                 className="pl-4 sm:basis-1 md:basis-1/3 lg:basis-1/4"
//               >
//                 <div>
//                   <SliderItem
//                     images={item.images}
//                     nights={item.nights}
//                     name={item.name}
//                     days={item.days}
//                     price={item.price}
//                     discountedPrice={item.discountedPrice}
//                   />
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </div>
//   );
// }

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
