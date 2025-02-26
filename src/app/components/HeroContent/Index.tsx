import React from "react";
import { Hero } from "@/types/Hero";
import Image from "next/image";
import HeroCard from "./Card";

const HeroContent = (props: Omit<Hero, "id">) => {
  const { title, description, backgroundImage } = props;
  return (
    <section>
      <div className="absolute -z-50 inset-0 h-full">
        <Image
          src={backgroundImage.data.attributes.url}
          alt={backgroundImage.data.attributes.name || ""}
          fill
          objectFit="cover"
          priority
        />
      </div>
      <div className="content-wrapper">
        <div className="w-full xl:w-1/2">
          <HeroCard title={title} description={description} />
        </div>
      </div>
    </section>
  );
};

export default HeroContent;
