import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import WhatsAppButton from "@/components/WhatsappBtn";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: [
    {
      url: "/favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
    {
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  title:
    "Best Travel Agency in Uttarakhand & Dehradun | Char Dham Yatra Specialist | Explore Case",
  description:
    "Explore Case is the best travel agency in Uttarakhand and a top-rated tour and travel agency in Dehradun. We are your trusted partner and the best travel agency for Char Dham Yatra, family, and adventure packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Navbar />
        <section className="pt-20 ">{children} </section>
        <WhatsAppButton phoneNumber=" 8126912729" />
        <Footer />
      </body>
    </html>
  );
}
