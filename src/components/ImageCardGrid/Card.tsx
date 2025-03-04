import { ReactElement } from "react";
import { Card } from "@/types/ImageCard";
import Image from "next/image";
import { Button } from "../ui/Button";

const ImageCard = ({ place, url, price, date }: Card): ReactElement => {
  return (
    <div className="bg-white shadow rounded-3xl hover:border-2 hover:border-gray-400">
      <div className="pt-3 flex justify-center">
        <Image src={url} alt={"image"} width={312} height={312} />
      </div>
      <div className="flex flex-col gap-5 font-inter p-6">
        <h1 className="font-bold text-lg md:text-xl h-12">Place: {place}</h1>
        <p className="font-medium text-base">Price: {price}/day</p>
        <p className="font-normal text-base">Date: {date}</p>
        <Button className="w-1/2" variant="outline">
          More Details
        </Button>
        <Button className="mb-1.5" variant="default">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ImageCard;
