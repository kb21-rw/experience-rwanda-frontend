import { ReactElement } from "react";
import { Card } from "@/types/ImageCard";
import Image from "next/image";

const ImageCard = ({ place, image, price, date }: Card): ReactElement => {
  const { url, alternativeText, width, height } = image.data.attributes;

  console.log("object.........................", url);
  return (
    <div className="bg-white shadow rounded-3xl hover:border-2 hover:border-gray-400">
      <div className="pt-3 flex justify-center">
        <Image
          src={"/uploads/akagera.png"}
          alt={alternativeText || "image"}
          width={width}
          height={height}
        />
      </div>
      <div className="p-6 flex flex-col gap-5">
        <h1 className="font-bold text-xl font-figtree">Place: {place}</h1>
        <p className="font-medium text-base">Price: {price}/day</p>
        <p className="font-normal text-base">Date: {date}</p>

        {/* Buttons soon will be replaced but button component */}
        <button className="border border-gray-400 rounded-lg w-1/2 py-1">
          More Details
        </button>
        <button className="bg-black py-2 text-white rounded-full pt-1">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
