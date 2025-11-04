"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  MapPin,
  Calendar,
  Check,
  X,
  Mountain,
  Camera,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
  Phone,
  MessageCircle,
  Mail,
  Wallet,
  CalendarCheck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ComingSoonPage from "@/components/ComingSoon";
import Image from "next/image";
import { getPackage, getPriceRange } from "@/lib/package";
const ToursPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [expandedDay, setExpandedDay] = useState<null | number>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
    setShowTerms(false); // Reset terms visibility when switching tours
  }, []);

  const toggleDay = (dayIndex: null | number) => {
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  let currentTour;
  if (!id) {
    currentTour = null;
  } else {
    currentTour = getPackage(id.toString());
  }

  if (!currentTour)
    return (
      <>
        <ComingSoonPage />
      </>
    );
  currentTour.price = getPriceRange(currentTour?.price);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentTour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + currentTour.images.length) % currentTour.images.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 pb-72">
      {/* Header */}
      <header
        className={`bg-white shadow-lg border-b-4 border-emerald-500 transition-all duration-1000 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            Explore Our Tours
          </h1>
          <p className="text-emerald-600">Journeys that spark your soul.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tour Details */}
        <div
          className={`transition-all duration-700 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Hero Image Section with Tour Info Overlay */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
            <Image
              src={currentTour.heroImage}
              alt={currentTour.tourName}
              width={1000}
              height={1000}
              className="w-full h-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {currentTour.tourName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-emerald-300" />
                  <span className="text-xl font-medium">
                    {currentTour.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-emerald-300" />
                  <span className="text-xl font-medium">
                    From: {currentTour.startPoint}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-emerald-300" />
                  <span className="text-xl font-medium">
                    To: {currentTour.endPoint}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Image Carousel Section */}
          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div className="bg-emerald-100 p-6 border-b">
              <h3 className="text-2xl font-bold text-emerald-800 flex items-center">
                <Camera className="h-6 w-6 mr-2" />
                Tour Gallery
              </h3>
            </div>
            <div className="p-6">
              {/* Main Image Display */}
              <div className="relative h-80 md:h-96 lg:h-fit rounded-xl overflow-hidden mb-4 group">
                <Image
                  width={1000}
                  height={1000}
                  src={currentTour.images[currentImageIndex]}
                  alt={`${currentTour.tourName} - Gallery Image ${
                    currentImageIndex + 1
                  }`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {currentTour.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center space-x-2">
                {currentTour.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? "border-emerald-500 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-emerald-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* About Section with Side Image */}

          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            {/* Main Flex Container */}
            <div className="flex flex-col lg:flex-row lg:h-[60rem]">
              {/* Left Panel: About + Quick Facts + Pricing Card */}
              <div className="flex-1 flex flex-col p-4 lg:p-8 lg:pr-4">
                {/* About Section */}
                <div className="flex-1 flex flex-col justify-between mb-6 lg:mb-0">
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
                      <Mountain className="h-6 w-6 mr-2" />
                      About This Tour
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {currentTour.about}
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">
                      Quick Facts
                    </h4>
                    <div className="space-y-2 text-sm text-emerald-700">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {currentTour.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Point:</span>
                        <span className="font-medium">
                          {currentTour.startPoint.split(" / ")[0]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Days:</span>
                        <span className="font-medium">
                          {currentTour.itinerary.length} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Support Card */}
                <div className="mt-6 lg:mt-4">
                  <div className="bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-4 pt-4">
                      <Wallet className="text-emerald-600 w-5 h-5" />
                      <h3 className="text-lg font-bold text-emerald-800">
                        Price Details
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="px-4 py-2">
                      <p className="text-emerald-900 font-semibold  md:text-xl">
                        Price:{" "}
                        <span className="font-bold">
                          {currentTour.price[0]} per person.
                        </span>
                      </p>
                    </div>

                    {/* Support Section */}
                    <div className="px-4 py-3 bg-emerald-100/50">
                      <p className="text-emerald-700 text-sm font-medium mb-2">
                        Need help?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            window.open("https://wa.me/8126912729", "_blank")
                          }
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">WhatsApp</span>
                        </button>
                        <button
                          onClick={() =>
                            window.open("tel:+918126912729", "_blank")
                          }
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm font-medium">Call</span>
                        </button>
                        <button
                          onClick={() =>
                            (window.location.href =
                              "mailto:info@explorecase.in")
                          }
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg transition-all duration-200 hover:shadow-md"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm font-medium">Email</span>
                        </button>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="px-4 py-3">
                      <button
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                        onClick={() => router.push("/booking")}
                      >
                        <CalendarCheck className="w-5 h-5" />
                        Book Online Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Hero Image */}
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                <Image
                  width={1000}
                  height={1000}
                  src={currentTour.images[0]}
                  alt={`${currentTour.tourName} landscape`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
              </div>
            </div>
          </div>
          {/* Itinerary with Day Images */}
          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div className="bg-emerald-100 p-6 border-b">
              <h3 className="text-2xl font-bold text-emerald-800 flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Day-wise Itinerary
              </h3>
            </div>
            <div className="p-6">
              {currentTour.itinerary.map((day, index) => (
                <div
                  key={index}
                  className="mb-6 border border-emerald-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleDay(index)}
                    className="w-full px-6 py-4 bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Day Image Thumbnail */}

                      <div className="text-left">
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Day {day.day}
                        </span>
                        <h4 className="font-semibold text-emerald-800 mt-2">
                          {day.title}
                        </h4>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-emerald-600 transition-transform duration-300 ${
                        expandedDay === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedDay === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-6 bg-white border-t border-emerald-100">
                      <ul className="space-y-3">
                        {day.activities.map((activity, actIndex) => (
                          <li
                            key={actIndex}
                            className="flex items-start space-x-3 animate-fade-in"
                          >
                            <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Inclusions and Exclusions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Inclusions */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-green-100 p-6 border-b">
                <h3 className="text-2xl font-bold text-green-800 flex items-center">
                  <Check className="h-6 w-6 mr-2" />
                  {"What's Included"}
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {currentTour.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-red-100 p-6 border-b">
                <h3 className="text-2xl font-bold text-red-800 flex items-center">
                  <X className="h-6 w-6 mr-2" />
                  {"What's Not Included"}
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {currentTour.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Terms and Conditions - Compact Version */}
          <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
            <div
              className="bg-amber-100 p-6 border-b cursor-pointer hover:bg-amber-200 transition-colors duration-300"
              onClick={() => setShowTerms(!showTerms)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-amber-800" />
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800">
                      Terms & Conditions
                    </h3>
                    <p className="text-amber-700 text-sm mt-1">
                      {currentTour.termsAndConditions.length} important terms -
                      Click to {showTerms ? "hide" : "view"}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-6 w-6 text-amber-800 transition-transform duration-300 ${
                    showTerms ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                showTerms ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-amber-700 text-sm">
                      By booking this tour, you agree to all terms listed below.
                      Please read carefully.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentTour.termsAndConditions?.map(
                    (term: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {term}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <span className="font-medium">Questions?</span> Contact our
                    support team for clarification on any terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Call to Action with Background Image */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                width={1000}
                height={1000}
                src={currentTour.images[currentTour.images.length - 1]}
                alt="Book your adventure"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative p-8 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">
                Ready for Your Adventure?
              </h3>
              <p className="mb-6 text-emerald-100 text-lg">
                Book now and create unforgettable memories in the mountains!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 text-lg"
                  onClick={() => router.push("/booking")}
                >
                  Book Now
                </button>
                <button
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 text-lg"
                  onClick={() => router.push("/customize")}
                >
                  Customize Your Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursPage;
