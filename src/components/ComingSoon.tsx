import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 px-6 text-center pb-72">
      {/* Icon */}
      <div className="bg-emerald-100 p-6 rounded-full mb-6 shadow-md">
        <FileQuestion className="w-16 h-16 text-emerald-600" />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
        Tour Details Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-lg text-emerald-700 max-w-xl mb-8">
        The information for this tour is currently being updated. Please check
        back later.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
