"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { getPackagesList } from "@/lib/package";

interface Package {
  id: number;
  name: string;
  price: string[];
}

interface FormData {
  packageId: number;
  packageName: string;
  arrivalDate: string;
  departureDate: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  carCoach: string;
}

interface FormErrors {
  [key: string]: string;
}

const carCoachOptions = [
  "Not Required",
  "Sedan (4 Seater)",
  "Tempo Traveller (12 Seater)",
  "Mini Bus (17 Seater)",
];

export default function OnlineBookingForm() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [formData, setFormData] = useState<FormData>({
    packageId: 0,
    packageName: "",
    arrivalDate: "",
    departureDate: "",
    name: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    city: "",
    streetAddress: "",
    carCoach: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      const packagesList = getPackagesList();
      setPackages(packagesList);
    };
    fetchPackages();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.packageName)
      newErrors.packageName = "Please select a package";
    if (!formData.arrivalDate)
      newErrors.arrivalDate = "Arrival date is required";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required";

    // Date validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrivalDate = new Date(formData.arrivalDate);
    const departureDate = new Date(formData.departureDate);

    if (arrivalDate < today) {
      newErrors.arrivalDate = "Arrival date cannot be in the past";
    }

    if (departureDate < today) {
      newErrors.departureDate = "Departure date cannot be in the past";
    }

    if (
      formData.arrivalDate &&
      formData.departureDate &&
      departureDate <= arrivalDate
    ) {
      newErrors.departureDate = "Departure date must be after arrival date";
    }

    // Calculate trip duration
    if (
      formData.arrivalDate &&
      formData.departureDate &&
      departureDate > arrivalDate
    ) {
      const tripDays = Math.ceil(
        (departureDate.getTime() - arrivalDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (tripDays > 365) {
        newErrors.departureDate = "Trip duration cannot exceed 365 days";
      }
    }

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (
      !/^[+]?[\d\s\-\(\)]{10,15}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = parseInt(e.target.value);
    const pkg = packages.find((p) => p.id === packageId);

    setFormData((prev) => ({
      ...prev,
      packageId: pkg ? pkg.id : 0,
      packageName: pkg ? pkg.name : "",
    }));

    if (errors.packageName) {
      setErrors((prev) => ({ ...prev, packageName: "" }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorElement = document.querySelector(".error-field");
      firstErrorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/online-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      packageId: 0,
      packageName: "",
      arrivalDate: "",
      departureDate: "",
      name: "",
      phone: "",
      email: "",
      country: "",
      state: "",
      city: "",
      streetAddress: "",
      carCoach: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Calculate trip duration
  const getTripDuration = () => {
    if (formData.arrivalDate && formData.departureDate) {
      const arrival = new Date(formData.arrivalDate);
      const departure = new Date(formData.departureDate);
      const diffTime = departure.getTime() - arrival.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  if (isSubmitted) {
    const tripDuration = getTripDuration();
    return (
      <>
        <Head>
          <title>Booking Confirmed - Travel Agency</title>
          <meta
            name="description"
            content="Your travel booking has been successfully confirmed."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-2xl rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for booking with us! Your reservation has been
                successfully submitted and our team will process your booking
                shortly.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-emerald-800 mb-3">
                  Your Booking Details
                </h2>
                <div className="space-y-2 text-left">
                  <p className="text-emerald-700">
                    <strong>Package:</strong> {formData.packageName}
                  </p>
                  <p className="text-emerald-700">
                    <strong>Arrival:</strong>{" "}
                    {new Date(formData.arrivalDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-emerald-700">
                    <strong>Departure:</strong>{" "}
                    {new Date(formData.departureDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="text-emerald-700">
                    <strong>Duration:</strong> {tripDuration}{" "}
                    {tripDuration === 1 ? "Day" : "Days"}, {tripDuration - 1}{" "}
                    {tripDuration === 2 ? "Night" : "Nights"}
                  </p>
                  {formData.carCoach &&
                    formData.carCoach !== "Not Required" && (
                      <p className="text-emerald-700">
                        <strong>Transport:</strong> {formData.carCoach}
                      </p>
                    )}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">
                  {"What's"} Next?
                </h2>
                <ul className="text-sm text-blue-700 space-y-2 text-left">
                  <li>
                    • {"You'll"} receive a confirmation email within 1 hour
                  </li>
                  <li>
                    • Our team will verify availability and contact you within
                    4-6 hours
                  </li>
                  <li>
                    • {"You'll"} receive final itinerary and booking voucher
                  </li>
                </ul>
              </div>

              <button
                onClick={handleReset}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Online Booking - Book Your Dream Vacation</title>
        <meta
          name="description"
          content="Book your perfect vacation package online. Choose from our curated travel packages and secure your booking instantly."
        />
        <meta
          name="keywords"
          content="online booking, travel packages, vacation booking, tour reservation, holiday packages"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Online Booking - Book Your Dream Vacation"
        />
        <meta
          property="og:description"
          content="Book your perfect vacation package online with our easy booking system."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Online Booking
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Book your dream vacation in just a few clicks. Fill in your
              details below and {"we'll"} take care of the rest!
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Package & Travel Dates Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Package & Travel Dates
                </h2>

                <div className="space-y-6">
                  {/* Package Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="packageName"
                      value={formData.packageId}
                      onChange={handlePackageChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.packageName
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select your destination package</option>
                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name}
                        </option>
                      ))}
                    </select>
                    {errors.packageName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.packageName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Arrival Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Arrival Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="arrivalDate"
                        value={formData.arrivalDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.arrivalDate
                            ? "border-red-300 error-field"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.arrivalDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.arrivalDate}
                        </p>
                      )}
                    </div>

                    {/* Departure Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Departure Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        min={
                          formData.arrivalDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.departureDate
                            ? "border-red-300 error-field"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.departureDate && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.departureDate}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Trip Duration Display */}
                  {getTripDuration() > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-emerald-800 text-center">
                        <span className="font-semibold">Trip Duration:</span>{" "}
                        {getTripDuration()}{" "}
                        {getTripDuration() === 1 ? "Day" : "Days"},{" "}
                        {getTripDuration() - 1}{" "}
                        {getTripDuration() === 2 ? "Night" : "Nights"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.name
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.phone
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.email
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Address Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter your country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your street address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Transport Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Transportation
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Car/Coach
                  </label>
                  <select
                    name="carCoach"
                    value={formData.carCoach}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select transportation option</option>
                    {carCoachOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    Select a vehicle type if you need transportation during your
                    trip
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 disabled:transform-none focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Booking"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-4 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Secure Booking Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Secure & Encrypted
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Instant Confirmation
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
