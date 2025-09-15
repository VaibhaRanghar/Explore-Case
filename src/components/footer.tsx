import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 flex items-center ">
              Explore Case{" "}
              <span>
                <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
              </span>
            </h3>
            <p className="text-sm">
              We are one of the leading travel agency in Dehradun, Uttarakhand.
              We believe that time to time services and well-managed packages
              are the only way to earn customer satisfaction.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">
              Useful Links:
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact:</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@explorecase.in</li>
              <li>Phone: +91 8126912729</li>
              <li>Address: Dehradun, Uttarakhand, India</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">
              Follow Us:
            </h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/explore.case/profilecard/?igsh=YWoxbWc1eWtocW82"
                className="hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/share/1BPn5ghTEF/?mibextid=wwXIfr"
                className="hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Explore Case. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
