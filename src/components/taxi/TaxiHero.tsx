import Image from "next/image";

const HeroSection = () => (
  <section className="bg-gradient-to-r relative from-stone-600 to-stone-500 text-white py-28 px-4">
    <Image
      src="https://images.unsplash.com/photo-1669937736289-031161d1d9e7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Taxi Hero"
      width={1920}
      height={600}
      className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
    />
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Reliable Cab Services for Uttarakhand & All India Travel
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          Explore Case offers safe, comfortable, and affordable taxi services
          for local travel, outstation trips, Char Dham Yatra, airport
          transfers, and customized tours. Whether you are traveling solo, with
          family, or in a group, we have the right cab for your journey.
        </p>
      </div>
    </div>
  </section>
);
export default HeroSection;
