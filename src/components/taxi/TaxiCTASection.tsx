import Link from "next/link";

const CTASection = () => (
  <div className="min-w-7xl mb-20 sm:mb-10 self-center relative bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-none sm:rounded-2xl shadow-xl overflow-hidden">
    <div className="absolute inset-0"></div>
    <div className="relative p-8 text-center text-white">
      <h3 className="text-3xl font-bold mb-4">Ready for Your Adventure?</h3>
      <p className="mb-6 text-emerald-100 text-lg">
        Book now and create unforgettable memories in the mountains!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 text-lg"
          href={"/booking"}
        >
          Book Now
        </Link>
        <Link
          className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-all duration-300 transform hover:scale-105 text-lg"
          href={"/customize"}
        >
          Customize Your Trip
        </Link>
      </div>
    </div>
  </div>
);
export default CTASection;
