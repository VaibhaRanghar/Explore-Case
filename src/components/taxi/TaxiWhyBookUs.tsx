import { Shield, MapPin, Phone, Check } from "lucide-react";

const WhyBookWithUs = () => {
  const reasons = [
    {
      icon: <Check className="w-6 h-6" />,
      title: "All Inclusive Fixed Fair",
      description:
        "The fair of taxi and cab are very affordable, it doesn't include any hidden charges or extra fees",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "No Extra KM Charges",
      description:
        "Explore Case does not add up any extra charge for a few extra kilometre travel",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Assured Taxi and Cab",
      description:
        "Explore Case provides cab and taxi instantly upon booking. The services are available 24/7 and can be booked at any time to travel to different places with ease",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Customer Support",
      description:
        "Explore Case provides constant customer support to make sure that travel experience is smooth and convenient",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Book Cab From Explore Case
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyBookWithUs;
