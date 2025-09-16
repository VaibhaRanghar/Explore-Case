"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import BookNowPopup from "./BookNowPopup";

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          alt="Beautiful landscape"
          fill
          className="object-cover blur-[5px]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover Your Next
          <motion.span
            className="block mt-2 text-emerald-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Adventure
          </motion.span>
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="text-black border-white hover:bg-white/10"
            onClick={() => {
              setIsPopupOpen(true);
            }}
          >
            Book Now
          </Button>
        </motion.div>
      </motion.div>
      <BookNowPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </motion.div>
  );
}
