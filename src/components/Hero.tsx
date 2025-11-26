"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BookNowPopup from "./BookNowPopup";

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg (3).webp"
          alt="Beautiful landscape"
          fill
          className="object-cover blur-[5px]"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="visually-hidden">
          Why We Are the Best Travel Agency for Char Dham Yatra
        </h2>

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          Discover Your Next
          <span className="block mt-2 text-emerald-400">Adventure</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
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
        </div>
      </div>
      <BookNowPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
