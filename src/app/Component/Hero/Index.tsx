import React from "react";
import { HeroProps } from "@/types/Hero";
import HeroCard from "./Card";
const Hero = ({ title, description, backgroundImage }: HeroProps) => {
  return (
    <div className="bg-black flex">
      <div className="px-28 py-10 text-white">
        <h1 className="font-bold text-6xl font-Figtree">{title}</h1>
        <p className="text-lg pt-[54px]  border-b-2 border-gray-500 font-inter">
          {description}
        </p>
      </div>
      <HeroCard {...backgroundImage} />
    </div>
  );
};

export default Hero;
