import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Wanderlust</h3>
            <p className="text-sm">Creating unforgettable travel experiences and memories that last a lifetime.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#destinations" className="hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#tours" className="hover:text-white">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: hello@wanderlust.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Travel Street, City</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

