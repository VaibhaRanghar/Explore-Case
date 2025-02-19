"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";

const reasons = [
  {
    title: "Wellness exams & Diagnostic Testing",
    description:
      "Routine checkups are essential to your pet's health and happiness. Our comprehensive wellness exams focus on early detection of potential health issues, ensuring your pet stays healthy at every stage of life.",
  },
  {
    title: "Urgent Care & Emergencies",
    description:
      "When every second counts, we're here to provide prompt, life-saving care for your pets. From sudden illnesses to accidents, our experienced team is ready to act quickly and compassionately to ensure your pet gets the critical attention they need.",
  },
  {
    title: "Unforgettable Experiences",
    description:
      "Discover hidden gems and create lasting memories. Discover hidden gems and create lasting memories. Discover hidden gems and create lasting memories",
  },
  {
    title: "24/7 Veterinary Support",
    description:
      "When every second counts, we're here to provide prompt, life-saving care for your pets. From sudden illnesses to accidents, our experienced team is ready to act quickly and compassionately to ensure your pet gets the critical attention they need.",
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
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>{reason.title}</CardTitle>
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
