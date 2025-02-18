import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
