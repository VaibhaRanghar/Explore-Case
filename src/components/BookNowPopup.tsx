"use client";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import travel from "../../public/bookNow.svg";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

interface BookNowPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookNowPopup({ isOpen, onClose }: BookNowPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Toaster position="top-center" />
      <DialogContent className="sm:max-w-[425px] ">
        <div className="border border-slate-200 rounded-xl">
          <DialogHeader>
            <Image src={travel} alt="Book your trip image" />
            <DialogTitle className="self-center p-4 text-2xl">
              Book Your Trip
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4  px-3">
            <Button
              className="w-full flex items-center justify-center"
              onClick={() => (window.location.href = "tel:+917078235487")}
            >
              <Phone className="mr-2" size={20} />
              Call Us
            </Button>
            <div className="w-full flex items-center justify-center">
              <Button className="w-full flex items-center justify-center">
                <Mail className="mr-2" size={20} />
                <Link
                  href="mailto:info@explorecase.in"
                  target="_blank"
                  className="md:hidden"
                >
                  Email Us at info@explorecase.in
                </Link>{" "}
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@explorecase.in"
                  target="_blank"
                  className="hidden md:inline"
                >
                  Email Us at info@explorecase.in
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
//
