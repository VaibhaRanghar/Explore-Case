import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Important Links | ExploreCase",
  description: "Official government and tourism resources for travelers.",
};

const importantLinks = [
  {
    name: "National Disaster Management Authority (NDMA)",
    url: "http://www.ndma.gov.in/en/",
    description:
      "Official portal for disaster preparedness and management in India.",
  },
  {
    name: "Ministry of Tourism, Government of India",
    url: "https://tourism.gov.in",
    description:
      "National tourism policies, initiatives, and travel advisories.",
  },
  {
    name: "Uttarakhand Tourism Development Board",
    url: "http://uttarakhandtourism.gov.in/",
    description:
      "Official tourism guide for Uttarakhand—destinations, itineraries, and permits.",
  },
  {
    name: "Government of Uttarakhand",
    url: "http://uk.gov.in/",
    description: "State government portal for citizen services and updates.",
  },
  {
    name: "Indian Railways – IRCTC",
    url: "http://www.indianrail.gov.in/",
    description:
      "Train schedules, bookings, and railway information across India.",
  },
];

export default function ImportantLinksPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Important Links
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted official resources for travelers, safety, and government
            services in India.
          </p>
        </div>

        {/* Links Grid */}
        <div className="space-y-5">
          {importantLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="font-bold text-emerald-800 text-lg mb-1">
                    {link.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{link.description}</p>
                </div>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-600 font-medium hover:text-emerald-800 transition-colors whitespace-nowrap"
                >
                  Visit Site
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            All links lead to official government websites. We are not
            responsible for external content.
          </p>
        </div>
      </div>
    </div>
  );
}
