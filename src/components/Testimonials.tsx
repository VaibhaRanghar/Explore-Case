import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Turner",
    location: "United Kingdom",
    image: "/placeholder.svg?height=100&width=100",
    text: "“The team at Dogsie is simply amazing. They treated my dog, Bella, with so much care and compassion during her surgery. I couldn't have asked for better service.”",
  },
  {
    name: "Michael Rivera",
    location: "France",
    image: "/placeholder.svg?height=100&width=100",
    text: "“Dogsie has been a lifesaver for our family. The emergency care they provided for our cat, Whiskers, was quick and professional. I'll never go anywhere else.”",
  },
  {
    name: "Emily Chen",
    location: "Japan",
    image: "/placeholder.svg?height=100&width=100",
    text: "“From routine checkups to dental cleanings, Dogsie always goes above and beyond. My golden retriever, Max, is in the best hands.”",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read about experiences from our satisfied travelers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-emerald-600 mb-4" />
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={
                        testimonial.image ||
                        "/placeholder.svg?height=1080&width=1920"
                      }
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
