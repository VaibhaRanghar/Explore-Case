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
  name: string;
  email: string;
  budget: string;
  tripDate: string;
  adults: number;
  children6to12: number;
  childrenBelow5: number;
  tripRequirement: string;
  accommodationType: string;
}

interface FormErrors {
  [key: string]: string;
}

const accommodationTypes = [
  { value: "budget", label: "Budget", index: 0 },
  { value: "standard", label: "Standard", index: 1 },
  { value: "deluxe", label: "Deluxe", index: 2 },
  { value: "premium", label: "Premium", index: 3 },
];

export default function CustomizeForm() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<FormData>({
    packageId: 0,
    packageName: "",
    name: "",
    email: "",
    budget: "",
    tripDate: "",
    adults: 1,
    children6to12: 0,
    childrenBelow5: 0,
    tripRequirement: "",
    accommodationType: "",
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

    if (!formData.packageName)
      newErrors.packageName = "Please select a package";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.budget) newErrors.budget = "Please select your budget";
    if (!formData.tripDate) newErrors.tripDate = "Please select trip date";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.tripDate);
    if (selectedDate < today) {
      newErrors.tripDate = "Trip date cannot be in the past";
    }

    const totalPax =
      formData.adults + formData.children6to12 + formData.childrenBelow5;
    if (totalPax === 0) newErrors.adults = "At least one traveler is required";
    if (totalPax > 50)
      newErrors.adults = "Maximum 50 travelers allowed per booking";

    if (!formData.accommodationType)
      newErrors.accommodationType = "Please select accommodation type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const packageId = parseInt(e.target.value);
    const pkg = packages.find((p) => p.id === packageId);

    if (pkg) {
      setSelectedPackage(pkg);
      setFormData((prev) => ({
        ...prev,
        packageId: pkg.id,
        packageName: pkg.name,
        budget: "",
        accommodationType: "",
      }));
    } else {
      setSelectedPackage(null);
      setFormData((prev) => ({
        ...prev,
        packageId: 0,
        packageName: "",
        budget: "",
        accommodationType: "",
      }));
    }
  };

  const handleAccommodationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const accommodation = e.target.value;
    const accommodationIndex = accommodationTypes.findIndex(
      (a) => a.value === accommodation
    );

    setFormData((prev) => ({
      ...prev,
      accommodationType: accommodation,
      budget: selectedPackage ? selectedPackage.price[accommodationIndex] : "",
    }));

    if (errors.accommodationType) {
      setErrors((prev) => ({ ...prev, accommodationType: "" }));
    }
    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: "" }));
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const budget = e.target.value;
    const budgetIndex =
      selectedPackage?.price.findIndex((p) => p === budget) || -1;

    setFormData((prev) => ({
      ...prev,
      budget: budget,
      accommodationType:
        budgetIndex !== -1 ? accommodationTypes[budgetIndex].value : "",
    }));

    if (errors.budget) {
      setErrors((prev) => ({ ...prev, budget: "" }));
    }
    if (errors.accommodationType) {
      setErrors((prev) => ({ ...prev, accommodationType: "" }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      name === "adults" ||
      name === "children6to12" ||
      name === "childrenBelow5"
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
      const response = await fetch("/api/customize-trip", {
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
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      packageId: 0,
      packageName: "",
      name: "",
      email: "",
      budget: "",
      tripDate: "",
      adults: 1,
      children6to12: 0,
      childrenBelow5: 0,
      tripRequirement: "",
      accommodationType: "",
    });
    setSelectedPackage(null);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Trip Customization Submitted - Travel Agency</title>
          <meta
            name="description"
            content="Your customized trip request has been successfully submitted."
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
                Trip Customization Request Received!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for choosing to customize your trip with us. Our
                travel experts will review your requirements and get back to you
                with a personalized itinerary and quote within 24-48 hours.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-emerald-800 mb-2">
                  Your Selected Package
                </h2>
                <p className="text-2xl font-bold text-emerald-900 mb-2">
                  {formData.packageName}
                </p>
                <p className="text-emerald-700">
                  Accommodation:{" "}
                  {
                    accommodationTypes.find(
                      (a) => a.value === formData.accommodationType
                    )?.label
                  }
                </p>
                <p className="text-emerald-700">
                  Budget Range: {formData.budget}
                </p>
                <p className="text-emerald-700 mt-2">
                  Total Travelers:{" "}
                  {formData.adults +
                    formData.children6to12 +
                    formData.childrenBelow5}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">
                  What happens next?
                </h2>
                <ul className="text-sm text-blue-700 space-y-2 text-left">
                  <li>
                    • Our team will review your preferences and requirements
                  </li>
                  <li>
                    • {"We'll"} create a customized itinerary matching your
                    budget
                  </li>
                  <li>• {"You'll"} receive a detailed proposal via email</li>
                  <li>
                    • {"We'll"} schedule a call to discuss and finalize the
                    details
                  </li>
                  <li>
                    • Once approved, {"we'll"} handle all bookings and
                    arrangements
                  </li>
                </ul>
              </div>
              <button
                onClick={handleReset}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Customize Another Trip
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
        <title>Customize Your Trip - Personalized Travel Packages</title>
        <meta
          name="description"
          content="Customize your dream vacation with our personalized travel packages. Choose your destination, accommodation, and budget to create the perfect trip."
        />
        <meta
          name="keywords"
          content="customize trip, personalized travel, tour packages, custom itinerary, travel planning"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="Customize Your Trip - Personalized Travel Packages"
        />
        <meta
          property="og:description"
          content="Create your perfect vacation with our customizable travel packages."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Customize Your Dream Trip
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your travel preferences and {"we'll"} create a
              personalized itinerary tailored to your needs and budget.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Package Selection Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Select Your Package
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
                      <option value="">Choose a destination package</option>
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
                    {/* Accommodation Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accommodation Type{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="accommodationType"
                        value={formData.accommodationType}
                        onChange={handleAccommodationChange}
                        disabled={!selectedPackage}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                          errors.accommodationType
                            ? "border-red-300 error-field"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Accommodation</option>
                        {accommodationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.accommodationType && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.accommodationType}
                        </p>
                      )}
                      {!selectedPackage && (
                        <p className="mt-1 text-sm text-gray-500">
                          Please select a package first
                        </p>
                      )}
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Your Budget{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleBudgetChange}
                        disabled={!selectedPackage}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                          errors.budget
                            ? "border-red-300 error-field"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Budget Range</option>
                        {selectedPackage?.price.map((priceRange, index) => (
                          <option key={index} value={priceRange}>
                            {priceRange} - {accommodationTypes[index].label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.budget}
                        </p>
                      )}
                      {!selectedPackage && (
                        <p className="mt-1 text-sm text-gray-500">
                          Please select a package first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Your Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
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

                  {/* Email */}
                  <div>
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

                  {/* Trip Date */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trip Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="tripDate"
                      value={formData.tripDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.tripDate
                          ? "border-red-300 error-field"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.tripDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.tripDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Travelers Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-emerald-200">
                  Number of Travelers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Adults */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adults <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="adults"
                      value={formData.adults}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Children 6-12 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Children (6-12 Yrs)
                    </label>
                    <input
                      type="number"
                      name="children6to12"
                      value={formData.children6to12}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Children Below 5 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Children (Below 5 Yrs)
                    </label>
                    <input
                      type="number"
                      name="childrenBelow5"
                      value={formData.childrenBelow5}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                {errors.adults && (
                  <p className="mt-2 text-sm text-red-600">{errors.adults}</p>
                )}

                <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-700">
                    Total Travelers:{" "}
                    <span className="font-bold text-lg text-emerald-900">
                      {formData.adults +
                        formData.children6to12 +
                        formData.childrenBelow5}
                    </span>
                  </p>
                </div>
              </div>

              {/* Trip Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Trip Requirement
                </label>
                <textarea
                  name="tripRequirement"
                  value={formData.tripRequirement}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please enter your trip requirement (if any) - special dietary needs, accessibility requirements, preferred activities, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
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
                    "Submit Customization Request"
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

          {/* Info Section */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Why Customize Your Trip?
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
                  Personalized Itinerary
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
                  Expert Travel Guidance
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.433 8.418 8 8.007 8 7.5c0-.507.433-.918.433-.918z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Best Value for Money
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
