"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

const VehicleShowcase = () => {
  // Sample car images - replace with your actual images
  const slides = [
    { id: 1, src: "/cars/car1.jpg", alt: "Maruti Ertiga" },
    { id: 2, src: "/cars/swift.jpg", alt: "Swift" },
    { id: 3, src: "/cars/car3.jpg", alt: "Traveller" },
    { id: 4, src: "/cars/car4.webp", alt: "Innova" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSlidePosition = (slideIndex: number) => {
    const diff = slideIndex - currentIndex;
    const totalSlides = slides.length;

    // Handle wrap around
    let position = diff;
    if (diff > totalSlides / 2) {
      position = diff - totalSlides;
    } else if (diff < -totalSlides / 2) {
      position = diff + totalSlides;
    }

    return position;
  };

  const getSlideStyle = (slideIndex: number) => {
    const position = getSlidePosition(slideIndex);
    const isCenter = position === 0;
    const isVisible = Math.abs(position) <= 1;

    if (!isVisible) {
      return {
        transform: "translateX(0) translateZ(-200px) rotateY(0deg)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    let translateX = position * 400; // Base spacing
    const translateZ = isCenter ? 0 : -100;
    let rotateY = position * -25; // Rotation angle
    const opacity = isCenter ? 1 : 0.4; // Fade non-center slides
    let scale = isCenter ? 1 : 0.8;
    const zIndex = isCenter ? 10 : Math.abs(position) === 1 ? 5 : 1;

    // Responsive adjustments
    if (isMobile) {
      translateX = position * 200;
      rotateY = position * -20;
      scale = isCenter ? 1 : 0.7;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      pointerEvents: "auto",
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-0 sm:mb-12 text-gray-800">
        Car Rentals and Taxi Service
      </h2>

      <div className="relative">
        {/* Main Carousel Container */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute cursor-pointer transition-all duration-500 ease-out"
                style={getSlideStyle(index) as React.CSSProperties}
                onClick={() => goToSlide(index)}
              >
                <div className="relative w-56 h-32 sm:w-80 sm:h-44 md:w-96 md:h-52 lg:w-[500px] lg:h-[300px] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-sm md:text-base font-semibold truncate">
                      {slide.alt}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-emerald-500/80 text-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-emerald-500/80 text-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Keyboard Event Listener */}
      <div
        className="sr-only"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prevSlide();
          if (e.key === "ArrowRight") nextSlide();
        }}
        autoFocus
      />
    </div>
  );
};

export default VehicleShowcase;
