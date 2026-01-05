import { Car, Users, CreditCard, Shield } from "lucide-react";
// Features Component
const Features = () => {
  const features = [
    { icon: <Car className="w-8 h-8" />, title: "Easy Online Booking" },
    { icon: <Users className="w-8 h-8" />, title: "Professional Drivers" },
    { icon: <Shield className="w-8 h-8" />, title: "Big Fleet of Vehicles" },
    { icon: <CreditCard className="w-8 h-8" />, title: "Online Payment" },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
