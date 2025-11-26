import Head from "next/head";

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

      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-emerald-700 pb-10 sm:pb-32 md:pb-72">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Best Taxi and Car Rental Service in Uttarakhand for All Tours
        </h1>
        <p className="max-w-xl text-center text-lg mb-12 px-4">
          Explore Case offers the best taxi service in Uttarakhand for Chardham
          Yatra, airport transfers, and local travel. Book our reliable car
          rental service in Uttarakhand at the lowest prices.
        </p>
        <div className="bg-emerald-100 border border-emerald-700 rounded-lg px-8 py-6 text-center max-w-md">
          <h2 className="text-3xl font-semibold mb-4 text-emerald-800">
            Coming Soon
          </h2>
          <p className="text-lg text-emerald-700">
            This page is under development. We will be live soon with our full
            taxi and car rental services.
          </p>
        </div>
      </main>
    </>
  );
}
