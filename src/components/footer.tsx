import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="relative ">
      <footer className="bg-gray-900 text-gray-300 footerSvg">
        <Image
          src="/Vector.png"
          alt="Landscape Divider"
          width={1000}
          height={1000}
          className="absolute h-24 -top-24 sm:h-40 sm:-top-40 md:h-48 md:-top-48 lg:h-72 lg:-top-72  min-w-full  pointer-events-none"
        />
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
                We are one of the leading travel agency in Dehradun,
                Uttarakhand. We believe that time to time services and
                well-managed packages are the only way to earn customer
                satisfaction.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">
                Useful Links:
              </h4>

              <ul className="space-y-2 text-sm grid grid-cols-2 grid-rows-0 gap-2">
                <li className="self-end">
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="col-start-1 row-start-2">
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li className="col-start-1 row-start-3">
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li className="col-start-1 row-start-4">
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li className="col-start-2 row-start-1">
                  <Link href="/privacy" className="hover:text-white">
                    Policies
                  </Link>
                </li>
                <li className="col-start-2 row-start-2">
                  <Link href="/privacy/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="col-start-2 row-start-3">
                  <Link href="/privacy/refund" className="hover:text-white">
                    Refund
                  </Link>
                </li>
                <li className="col-start-2 row-start-4">
                  <Link href="/important" className="hover:text-white">
                    Important Links
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-2">
                Contact:
              </h4>
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
                <Link
                  href="https://x.com/explore_case?s=21"
                  className="hover:text-white"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Explore Case. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
