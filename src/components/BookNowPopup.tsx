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
            <Image src={travel} alt="Booking Image" />
            <DialogTitle className="self-center p-4 text-2xl">
              Book Your Trip
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4  px-3">
            <Button
              className="w-full flex items-center justify-center"
              onClick={() => (window.location.href = "tel:+918126912729")}
            >
              <Phone className="mr-2" size={20} />
              Call Us
            </Button>
            <div className="w-full flex items-center justify-center">
              <Mail className="mr-2" size={20} />
              Email Us at info@explorecase.in
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
//
