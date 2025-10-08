import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function SliderItem({ images, name }: { images: string; name: string }) {
  const router = useRouter();
  return (
    <div className="shadow-lg rounded-md  border-2 shadow-slate-400 m-4 flex flex-col bg-white">
      <Image
        src={images || "/bookNow.svg"}
        alt={name}
        width={200}
        height={200}
        className="w-80 h-36 object-cover"
      />
      <div className="flex flex-col items-center p-4 gap-5">
        <h2 className="text-lg">{name}</h2>
        <Button onClick={() => router.push("/booking")}>Book Now</Button>
      </div>
    </div>
  );
}

export default SliderItem;
