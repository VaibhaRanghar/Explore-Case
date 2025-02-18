import ContactForm from "@/components/contact-form";
import Image from "next/image";
import contact from "../../../public/getInTouch.svg";

export default function ContactPage() {
  return (
    <div className="min-h-max bg-gray-100 pb-10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="relative ">
              <Image
                src={contact}
                alt="Contact Us"
                height={1000}
                width={1000}
                className="object-cover rounded-lg "
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
