import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaRegCheckCircle } from "react-icons/fa";
import IconContent from "../ui/IconContent";

type TripPackageProps = {
  title: string;
  icon: StaticImageData;
  items: string[];
};

const TripPackageCard = ({ title, icon, items }: TripPackageProps) => {
  return (
    <div className="bg-gray-750 w-80 bg-opacity-50 flex items-center flex-col rounded-5 py-6 text-white">
      <div className="bg-white h-32 w-32 mb-16 mt-6 rounded-full flex items-center justify-center">
        <Image src={icon} alt={title} layout="raw" />
      </div>
      <h3 className="mb-5 font-semibold text-xl">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <IconContent
            key={index}
            icon={() => <FaRegCheckCircle />}
            content={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default TripPackageCard;
