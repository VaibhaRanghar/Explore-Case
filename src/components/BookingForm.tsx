"use client";

import { useState } from "react";
import Head from "next/head";

interface FormData {
  ticketType: string;
  tourType: string;
  departureDate: string;
  destinationFrom: string;
  destinationTo: string;
  adults: number;
  children: number;
  infants: number;
  seniors: number;
  description: string;
  name: string;
  email: string;
  country: string;
  state: string;
  city: string;
  mobile: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    ticketType: "",
    tourType: "",
    departureDate: "",
    destinationFrom: "",
    destinationTo: "",
    adults: 1,
    children: 0,
    infants: 0,
    seniors: 0,
    description: "",
    name: "",
    email: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Switzerland",
    "Japan",
    "South Korea",
    "Singapore",
    "India",
    "Brazil",
    "Mexico",
    "Other",
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Travel Details Validation
    if (!formData.ticketType)
      newErrors.ticketType = "Please select ticket type";
    if (!formData.tourType) newErrors.tourType = "Please select tour type";
    if (!formData.departureDate)
      newErrors.departureDate = "Please select departure date";
    if (!formData.destinationFrom.trim())
      newErrors.destinationFrom = "Please enter departure location";
    if (!formData.destinationTo.trim())
      newErrors.destinationTo = "Please enter destination";

    // Check if departure date is in the past
    const today = new Date();
    const selectedDate = new Date(formData.departureDate);
    if (selectedDate < today) {
      newErrors.departureDate = "Departure date cannot be in the past";
    }

    // Same destination check
    if (
      formData.destinationFrom.toLowerCase().trim() ===
        formData.destinationTo.toLowerCase().trim() &&
      formData.destinationFrom.trim() &&
      formData.destinationTo.trim()
    ) {
      newErrors.destinationTo =
        "Destination cannot be the same as departure location";
    }

    // Ticket count validation
    const totalTickets =
      formData.adults + formData.children + formData.infants + formData.seniors;
    if (totalTickets === 0)
      newErrors.adults = "At least one ticket is required";
    if (totalTickets > 20)
      newErrors.adults = "Maximum 20 tickets allowed per booking";

    // Personal Information Validation
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.country) newErrors.country = "Please select country";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (
      !/^[+]?[\d\s\-\(\)]{10,15}$/.test(formData.mobile.replace(/\s/g, ""))
    ) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (
      name === "adults" ||
      name === "children" ||
      name === "infants" ||
      name === "seniors"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: Math.max(0, parseInt(value) || 0),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed to submit form");
      }
      console.log(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ticketType: "",
      tourType: "",
      departureDate: "",
      destinationFrom: "",
      destinationTo: "",
      adults: 1,
      children: 0,
      infants: 0,
      seniors: 0,
      description: "",
      name: "",
      email: "",
      country: "",
      state: "",
      city: "",
      mobile: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Booking Submitted - Travel Agency</title>
          <meta
            name="description"
            content="Your travel booking has been successfully submitted. We will contact you soon with booking details."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 pb-72">
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
                Booking Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for choosing our travel services. We will reach out to
                you soon with your booking details and confirmation whether your
                request can be processed.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-emerald-800 mb-2">
                  What happens next?
                </h2>
                <ul className="text-sm text-emerald-700 space-y-2 text-left">
                  <li>
                    • Our team will review your booking request within 24 hours
                  </li>
                  <li>
                    • We will check availability and pricing for your selected
                    dates
                  </li>
                  <li>
                    • You will receive an email with detailed booking
                    information
                  </li>
                  <li>
                    • Payment instructions will be provided upon confirmation
                  </li>
                </ul>
              </div>
              <button
                onClick={handleReset}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Submit Another Booking
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
        <title>Book Your Travel - Professional Travel Agency</title>
        <meta
          name="description"
          content="Book your perfect trip with our professional travel agency. Domestic and international flights, customized tour packages, competitive prices."
        />
        <meta
          name="keywords"
          content="travel booking, flights, domestic flights, international flights, tour packages, travel agency"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Book Your Travel - Professional Travel Agency"
        />
        <meta
          property="og:description"
          content="Book your perfect trip with our professional travel agency. Get the best deals on flights and tour packages."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 pb-72">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Book Your Perfect Trip
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and let us help you plan your dream
              vacation. We offer competitive prices and personalized service.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Travel Details Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Travel Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ticket Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="ticketType"
                      value={formData.ticketType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.ticketType
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Ticket Type</option>
                      <option value="domestic">Domestic</option>
                      <option value="international">International</option>
                    </select>
                    {errors.ticketType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.ticketType}
                      </p>
                    )}
                  </div>

                  {/* Tour Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tour Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.tourType
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Tour Type</option>
                      <option value="one-way">One Way</option>
                      <option value="round-trip">Round Trip</option>
                    </select>
                    {errors.tourType && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.tourType}
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
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
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

                  <div></div>

                  {/* Destination From */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationFrom"
                      value={formData.destinationFrom}
                      onChange={handleInputChange}
                      placeholder="Enter departure city"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.destinationFrom
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.destinationFrom && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.destinationFrom}
                      </p>
                    )}
                  </div>

                  {/* Destination To */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="destinationTo"
                      value={formData.destinationTo}
                      onChange={handleInputChange}
                      placeholder="Enter destination city"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.destinationTo
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.destinationTo && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.destinationTo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Number of Tickets */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Number of Tickets <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Adults
                      </label>
                      <input
                        type="number"
                        name="adults"
                        value={formData.adults}
                        onChange={handleInputChange}
                        min="0"
                        max="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Children
                      </label>
                      <input
                        type="number"
                        name="children"
                        value={formData.children}
                        onChange={handleInputChange}
                        min="0"
                        max="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Infants
                      </label>
                      <input
                        type="number"
                        name="infants"
                        value={formData.infants}
                        onChange={handleInputChange}
                        min="0"
                        max="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Sr. Citizens
                      </label>
                      <input
                        type="number"
                        name="seniors"
                        value={formData.seniors}
                        onChange={handleInputChange}
                        min="0"
                        max="20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  {errors.adults && (
                    <p className="mt-2 text-sm text-red-600">{errors.adults}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your requirements, special needs, or any specific preferences..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Fill Your Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.name
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
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

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.country
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.state
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.city
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact/Mobile No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your mobile number"
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.mobile
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-4 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Why Choose Us?
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
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Best Price Guarantee
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
                  24/7 Customer Support
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Trusted & Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
