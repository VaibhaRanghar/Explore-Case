// import Adventures from "@/components/Adventures";
import AdventureTourDesigns from "@/components/AdventureTourDesigns";
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
    <>
      <Head>
        <title>
          Best Travel Agency in Uttarakhand & Dehradun | Char Dham Yatra
          Specialist | Explore Case
        </title>
        <meta
          name="title"
          content="Best Travel Agency in Uttarakhand & Dehradun | Char Dham Yatra Specialist | Explore Case"
        />
        <meta
          name="description"
          content="Explore Case is the best travel agency in Uttarakhand and a top-rated tour and travel agency in Dehradun. We are your trusted partner and the best travel agency for Char Dham Yatra, family, and adventure packages."
        />
      </Head>
      <Navbar />
      <Hero />
      <ShortAbout />
      <CarouselSlider />
      <WhyChooseUs />
      <AdventureTourDesigns />
      <VehicleShowcase />
      <Testimonials />
    </>
  );
}
