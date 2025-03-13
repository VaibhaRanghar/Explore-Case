import CarouselSlider from "@/components/CarouselSlider";
import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";
import ShortAbout from "@/components/ShortAbout";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ShortAbout />
      <CarouselSlider />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
