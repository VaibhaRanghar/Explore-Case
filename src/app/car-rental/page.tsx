import Head from "next/head";
import React from "react";
import CTASection from "@/components/taxi/TaxiCTASection";
import Features from "@/components/taxi/TaxiFeatures";
import FleetGallery from "@/components/taxi/TaxiFleetGallery";
import HeroSection from "@/components/taxi/TaxiHero";
import CarTypesTable from "@/components/taxi/TaxiCarTypes";
import WhyBookWithUs from "@/components/taxi/TaxiWhyBookUs";

export default function TaxiServiceComingSoon() {
  return (
    <>
      <Head>
        <title>
          Best Taxi Service & Car Rental Service in Uttarakhand | Dehradun Cabs
        </title>
        <meta
          name="description"
          content="Explore Case offers the best taxi service in Uttarakhand for Chardham Yatra, airport transfers, and local travel. Book our reliable car rental service in Uttarakhand at the lowest prices."
        />
      </Head>
      <main className="min-h-screen flex flex-col justify-center text-emerald-700 pb-10 sm:pb-32 md:pb-72">
        <HeroSection />
        <Features />
        <CarTypesTable />
        <WhyBookWithUs />
        <FleetGallery />
        <CTASection />
      </main>
    </>
  );
}
