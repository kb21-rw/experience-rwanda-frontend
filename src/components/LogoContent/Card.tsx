import Image from "next/image";
import React from "react";
import { LogoCard } from "@/types/LogoContent";

const Card = ({ title, description, image }: LogoCard) => {
  return (
    <div className="flex flex-col gap-6 items-center md:items-start">
      <Image src={image} alt={image} width={48} height={48} />
      <h3 className="font-bold text-3xl">{title}</h3>
      <p className="text-center md:text-left">{description}</p>
    </div>
  );
};

export default Card;
