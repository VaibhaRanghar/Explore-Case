"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import userIcon from "../../public/userIcon.svg";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Link from "next/link";

const testimonials = [
  {
    name: "Aki Bisht",
    star: 5,
    image: userIcon,
    text: "“I recently booked a Badrinath package with Explore Case, and it was an amazing experience! From seamless booking to well-planned accommodations and transportation, everything was handled professionally. The team ensured a smooth journey, and the hospitality was top-notch. The trip was comfortable, and the guidance provided made the pilgrimage even more special. Highly recommended for Char Dham Yatra ❤️❤️❤️”",
  },
  {
    name: "Sanjana",
    star: 4,
    image: userIcon,
    text: "“I recently booked a travel package with Explore Case, and I must say, it was an amazing experience! The package was well-planned, offering the best room quality and top-notch services. Everything from accommodation to transportation was seamless, making our trip truly memorable. The team was professional, responsive, and ensured we had a hassle-free journey”",
  },
  {
    name: "Arun Bisht",
    star: 5,
    image: userIcon,
    text: "“Explore Case made our Char Dham Yatra smooth and stress-free. From well-maintained cabs to comfortable hotels, everything was well-organized. Highly recommended😍😍 …”",
  },
  {
    name: "Sumit Singh Panwar",
    star: 5,
    image: userIcon,
    text: "“Wonderful experience with Explore Case - Smooth journey, great service, and well-organized arrangements. Highly recommend Best travel agency in Dehradun ❤️❤️⭐⭐⭐⭐⭐”",
  },

  {
    name: "Neetu Devi",
    star: 4,
    image: userIcon,
    text: "“I had an amazing experience with Explore Case ,Their Char Dham tour packages are well organized, and the accommodations were comfortable. The transportation service was smooth, and the team was extremely professional and helpful throughout the journey. They also offer great international trip packages at competitive prices. Highly recommended for anyone looking for a affordable and premium travel experience❤️❤️❤️❤️”",
  },
  {
    name: "Ashish Bhardwaj",
    star: 5,
    image: userIcon,
    text: "“Best service provided by them....Very good experience and reasonable rate rate.. n aslo the car in highly good condition....”",
  },
  {
    name: "Akshat Sharma",
    star: 5,
    image: userIcon,
    text: "“My Char Dham Yatra with Explore Case was an unforgettable journey! Every aspect was well-organized, allowing me to focus on the spiritual essence of the trip. Highly recommended!”",
  },
  {
    name: "Monika Rawat",
    star: 4,
    image: userIcon,
    text: "“A big thank you to Explore Case for organizing our trip so smoothly! They planned our itinerary, arranged comfortable stays, and provided delicious meals throughout our journey from Dehradun to Barkot and Harshil. Everything was well managed, making our trip truly enjoyable. Their service was not only professional but also very affordable. We had a wonderful and memorable experience, and we highly recommend Explore Case for a perfect travel experience ❤️❤️❤️”",
  },
];

export default function Testimonials() {
  const [readMore, setReadMore] = useState<{ index: number; show: boolean }[]>(
    testimonials.map((item, index) => ({ index, show: false }))
  );
  const [itemsPerView, setItemsPerView] = useState(3); 
  const [curr, setCurr] = useState<number>(0);
  const stars = Array(5).fill(0);

  useEffect(() => {
    setCurr(0);

    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(3); // lg
      } else if (width >= 768) {
        setItemsPerView(2); // md
      } else {
        setItemsPerView(1); // default
      }
    };
    updateItemsPerView(); // initial check
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  return (
    <section
      className="py-20 bg-emerald-50"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read about experiences from our satisfied travelers around the world
          </p>
        </div>
        <div className="carousal w-full relative ">
          <Link
            href={`#slide${curr == 0 ? curr : curr - 1}`}
            aria-label="Previous testimonial"
            scroll={false}
            onClick={() => setCurr((prev) => (prev == 0 ? prev : prev - 1))}
            className="btn btn-circle btn-sm  btn-success fill-white absolute z-50 -left-2 lg:-left-5 top-1/2 opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
          </Link>
          <div className="content-center carousel-start overflow-hidden">
            <div
              className="carousel-track gap-2 md:gap-5 flex transition-transform duration-500 ease-out "
              style={{
                transform: `translateX(-${
                  (curr * 100 + curr * 3) / itemsPerView
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  id={"slide" + index}
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${
                    testimonials.length
                  }`}
                  aria-current={curr === index}
                  className="carousel-item relative w-full md:w-1/2 lg:w-1/3 bg-white"
                >
                  <CardContent className="p-6 flex justify-between flex-col h-full">
                    <div>
                      <Quote className="w-10 h-10 text-emerald-600 mb-4" />
                      <p className="text-gray-600 mb-4 h-[150px] overflow-scroll ">
                        {testimonial.text.length < 300 ? (
                          testimonial.text
                        ) : readMore[index]?.show ? (
                          <>
                            {testimonial.text}{" "}
                            <button
                              aria-label={`Show less about testimonial from ${testimonial.name}`}
                              className="text-blue-500 cursor-pointer"
                              onClick={() =>
                                setReadMore((prev) =>
                                  prev.map((item) =>
                                    item.index === index
                                      ? { ...item, show: !item.show }
                                      : item
                                  )
                                )
                              }
                            >
                              Show less
                            </button>
                          </>
                        ) : (
                          <>
                            {testimonial.text.slice(0, 300)}...
                            <button
                              aria-label={`Show more about testimonial from ${testimonial.name}`}
                              aria-expanded={readMore[index]?.show}
                              className="text-blue-500 cursor-pointer"
                              onClick={() =>
                                setReadMore((prev) =>
                                  prev.map((item) =>
                                    item.index === index
                                      ? { ...item, show: !item.show }
                                      : item
                                  )
                                )
                              }
                            >
                              Read more
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={
                            testimonial.image ||
                            "/placeholder.svg?height=1080&width=1920"
                          }
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 ">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm flex text-gray-600">
                          {stars.map((_, index) => {
                            return (
                              <span key={index}>
                                {index < testimonial.star ? (
                                  index + 0.5 === testimonial.star ? (
                                    <FaStarHalfStroke color="#F2C265" />
                                  ) : (
                                    <FaStar size="" color="#F2C265" />
                                  )
                                ) : (
                                  <FaRegStar size="" color="#ccc" />
                                )}
                              </span>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Link
            href={`#slide${curr == testimonials.length - 1 ? 0 : curr + 1}`}
            aria-label="Next testimonial"
            scroll={false}
            onClick={() =>
              setCurr((prev) =>
                prev == testimonials.length - 1 ? 0 : prev + 1
              )
            }
            className="btn btn-circle btn-sm  btn-success fill-white absolute -right-2 lg:-right-5 top-1/2 opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
