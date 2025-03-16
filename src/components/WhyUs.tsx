"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pricing from "../../public/whyChooseUs/money.png";
import business from "../../public/whyChooseUs/businessman.png";
import travel from "../../public/whyChooseUs/passport.png";
import hotel from "../../public/whyChooseUs/hotel.png";
import Image from "next/image";

const reasons = [
  {
    title: "Tailored Travel Packages",
    image: business,
    description:
      "We create customized travel experiences that match your interests, budget, and schedule, ensuring a seamless and personalized journey, whether you seek adventure, relaxation, or cultural exploration",
  },
  {
    title: " Premium Accommodations ",
    image: hotel,
    description:
      "Enjoy top-rated hotels, resorts, and homestays, ensuring a comfortable and luxurious stay. We offer a range of options, from budget-friendly stays to five-star luxury, tailored to your needs.",
  },
  {
    title: " Experienced Travel Experts",
    image: travel,
    description:
      "Our seasoned travel professionals provide expert guidance, local insights, and seamless planning to ensure a hassle-free, well-curated travel experience, making your journey smooth and enjoyable.",
  },
  {
    title: "Affordable Pricing ",
    image: pricing,
    description:
      "Enjoy high-quality travel at competitive prices with no hidden costs. We offer the best deals and transparent pricing, ensuring an unforgettable experience that fits your budget.",
  },
];
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 40);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why we are the best choice for your next travel adventure.
          </p>
        </div>

        <motion.div
          ref={ref}
          style={{ y: y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="text-center transition-all hover:scale-110"
            >
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    height={100}
                    width={100}
                    className="w-6 h-6 text-emerald-600"
                  />
                </div>
                <CardTitle className="text-lg">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
