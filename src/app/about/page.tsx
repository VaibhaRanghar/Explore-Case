"use client";
import { motion } from "framer-motion";
import {
  Plane,
  Users,
  Shield,
  HeartHandshake,
  Clock,
  Leaf,
  MapPin,
  Star,
  LucideIcon,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold text-emerald-700 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            At Explore Case, our mission is to provide a hassle-free, safe, and
            spiritually enriching Char Dham Yatra experience. We are dedicated
            to offering well-planned tours, reliable transportation, and
            comfortable accommodations, ensuring that every pilgrim can focus on
            their spiritual journey without any worries.
          </motion.p>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {missionPoints.map((point, index) => (
              <MissionPoint
                key={index}
                Icon={point.icon}
                text={point.text}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
            Why Choose Explore Case?
          </h2>
          <p className="text-gray-700 mb-4">
            {
              "With Explore Case, your pilgrimage is not just a trip—it's a journey of faith, devotion, and unforgettable memories."
            }
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                Icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}
interface MissionPointProps {
  Icon: LucideIcon;
  text: string;
  delay: number;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  delay,
}) => (
  <motion.div
    className="bg-emerald-50 rounded-lg p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Icon className="text-emerald-600 w-8 h-8 mb-4" />
    <h3 className="text-lg font-semibold text-emerald-700 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);
const MissionPoint: React.FC<MissionPointProps> = ({ Icon, text, delay }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="bg-emerald-100 rounded-full p-2">
      <Icon className="text-emerald-600 w-6 h-6" />
    </div>
    <p className="text-gray-700">{text}</p>
  </motion.div>
);
const missionPoints = [
  {
    icon: Users,
    text: "Make Char Dham travel accessible and convenient for all, including families, elderly pilgrims, and groups.",
  },
  {
    icon: Shield,
    text: "Ensure safety and comfort with trusted transport services and quality accommodations.",
  },
  {
    icon: HeartHandshake,
    text: "Deliver exceptional customer service with 24/7 support and personalized travel solutions.",
  },
  {
    icon: Leaf,
    text: "Promote sustainable tourism by respecting local culture and the sacred environment.",
  },
];

const features = [
  {
    icon: Plane,
    title: "Expert Travel Planning",
    description:
      "Our team of experienced travel experts crafts the perfect itinerary for your spiritual journey.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description:
      "Benefit from our deep understanding of the Char Dham region and its sacred sites.",
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description:
      "We handle all the logistics, allowing you to focus on your spiritual experience.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our top priority, with carefully vetted accommodations and transport.",
  },
  {
    icon: Star,
    title: "Memorable Experiences",
    description:
      "Create lasting memories with our thoughtfully curated spiritual journeys.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description:
      "Enjoy tailored support and assistance throughout your pilgrimage.",
  },
];
