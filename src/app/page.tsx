import Adventures from "@/components/Adventures";
import CarouselSlider from "@/components/CarouselSlider";
import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";
import ShortAbout from "@/components/ShortAbout";
import Testimonials from "@/components/Testimonials";
import VehicleShowcase from "@/components/VehicleShowcase";
import WhyChooseUs from "@/components/WhyUs";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Char Dham Yatra & Holiday Packages | Explore Case</title>
        <meta
          name="title"
          content="Char Dham Yatra & Holiday Packages | Explore Case"
        />
        <meta
          name="description"
          content="Book Char Dham Yatra, domestic & international holiday packages with Explore Case. Hotels, cab services & customized tours for families & groups."
        />
      </Head>
      <Navbar />
      <Hero />
      <ShortAbout />
      <CarouselSlider />
      <WhyChooseUs />
      <Adventures />
      <VehicleShowcase />
      <Testimonials />
    </div>
  );
}
