"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BookNowPopup from "./BookNowPopup";
import logo from "../../public/logo1.svg";
import { usePathname } from "next/navigation"; //Use pathName

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-emerald-600 flex gap-4 items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image src={logo} height={40} width={40} alt="Logo" /> ExploreCase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-600">
            <Link
              href="/"
              className={` hover:text-emerald-600 ${
                pathname === "/"
                  ? "text-emerald-600 underline underline-offset-4 decoration-2 "
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={` hover:text-emerald-600 ${
                pathname === "/services"
                  ? "text-emerald-600 underline underline-offset-4 decoration-2 "
                  : ""
              }`}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={` hover:text-emerald-600 ${
                pathname === "/about"
                  ? "text-emerald-600 underline underline-offset-4 decoration-2 "
                  : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={` hover:text-emerald-600 ${
                pathname === "/contact"
                  ? "text-emerald-600 underline underline-offset-4 decoration-2 "
                  : ""
              }`}
            >
              Contact
            </Link>
            <Button onClick={() => setIsPopupOpen(true)}>Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-4 text-gray-600">
              <Link
                href="/"
                className={` hover:text-emerald-600 ${
                  pathname === "/" ? "text-emerald-600" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className={` hover:text-emerald-600 ${
                  pathname === "/services" ? "text-emerald-600" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={` hover:text-emerald-600 ${
                  pathname === "/about" ? "text-emerald-600" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={` hover:text-emerald-600 ${
                  pathname === "/contact" ? "text-emerald-600" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  setIsPopupOpen(true);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
      <BookNowPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </header>
  );
}
