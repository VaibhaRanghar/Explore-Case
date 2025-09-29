"use client";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ShortAbout() {
  const [isVisible, setIsVisible] = useState({});
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  const fullText = "Char Dham Yatra & Holiday Packages | Explore Case";

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.animate]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50"
      aria-labelledby="shortabout-title"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl animate-pulse "></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100/30 rounded-full blur-2xl animate-pulse "></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div
            data-animate="title"
            className={`transition-all duration-1000 ${
              isVisible.title
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h1
              id="shortabout-title"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 bg-clip-text text-transparent leading-tight"
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          <div
            data-animate="subtitle"
            className={`transition-all duration-1000  ${
              isVisible.subtitle
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Book Char Dham Yatra, domestic & international holiday packages
              with Explore Case.
              <span className="text-emerald-600 font-semibold">
                {" "}
                Hotels, cab services & customized tours
              </span>{" "}
              for families & groups.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <article
            data-animate="content"
            className={`transition-all duration-1000  ${
              isVisible.content
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 text-justify text-lg">
                At{" "}
                <span className="font-semibold text-emerald-700">
                  Explore Case
                </span>
                , we specialize in crafting customized Char Dham packages that
                cater to individual, family, and group travel needs. We take
                care of all your travel requirements, including premium hotel
                bookings, reliable transportation, and helicopter bookings for
                Kedarnath, ensuring you get the most convenient and luxurious
                experience. Whether you want to reach Kedarnath via helicopter
                Yatra services or explore the Char Dham Yatra by road, we
                provide both options to suit your preference.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8 text-justify text-lg">
                Our services are designed to make your{" "}
                <span className="font-semibold text-emerald-700">
                  Char Dham Yatra
                </span>{" "}
                seamless and spiritually enriching.
              </p>

              {/* Features List */}
              <div
                data-animate="list"
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-emerald-100 mb-8 transition-all duration-500  ${
                  isVisible.list
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8"
                }`}
              >
                <ul className="space-y-4">
                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-emerald-700 transition-colors">
                      <strong className="text-emerald-800">
                        Personalized Char Dham Packages
                      </strong>{" "}
                      that are customized to your schedule, ensuring a tailored
                      travel experience.
                    </span>
                  </li>

                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-emerald-700 transition-colors">
                      <strong className="text-emerald-800">
                        Helicopter Yatra Services
                      </strong>{" "}
                      to Kedarnath, offering a convenient and scenic route for
                      travelers looking to save time and experience the
                      Himalayas from the sky.
                    </span>
                  </li>

                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-emerald-700 transition-colors">
                      <strong className="text-emerald-800">
                        Premium Hotel Stays
                      </strong>{" "}
                      in luxury hotels near Char Dham shrines to ensure you are
                      comfortable and well-rested.
                    </span>
                  </li>

                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-emerald-700 transition-colors">
                      <strong className="text-emerald-800">
                        Hassle-Free Travel
                      </strong>{" "}
                      with safe and dependable cab services for the entire Char
                      Dham pilgrimage route.
                    </span>
                  </li>

                  <li className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1 group-hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed group-hover:text-emerald-700 transition-colors">
                      <strong className="text-emerald-800">
                        Spiritual Tour Guides
                      </strong>{" "}
                      who provide enriching insights, helping you connect deeply
                      with the sacredness of the Char Dham temples.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                data-animate="closing"
                className={`bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg transition-all duration-1000  ${
                  isVisible.closing
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8"
                }`}
              >
                <p className="text-center text-lg font-medium leading-relaxed">
                  Join us for the ultimate Char Dham Yatra experience,
                  where every detail is planned with care to provide a peaceful,
                  sacred, and rejuvenating journey.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
}

export default ShortAbout;
