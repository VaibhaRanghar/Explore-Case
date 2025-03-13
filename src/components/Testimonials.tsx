"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import userIcon from "../../public/userIcon.svg";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";

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
  const [displayCount, setDisplayCount] = useState(3); // Display first 3 testimonials
  const stars = Array(5).fill(0);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) =>
      Math.min(prevCount + 3, testimonials.length)
    );
  };
  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read about experiences from our satisfied travelers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-scroll">
          {testimonials.slice(0, displayCount).map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-emerald-600 mb-4" />
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
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
                  <div className="ml-4">
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
        {displayCount < testimonials.length && (
          <button
            className="mx-auto block mt-8 bg-emerald-600 text-white py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
