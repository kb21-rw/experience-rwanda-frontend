import React from "react";
import Image from "next/image";
import type { HeroContent } from "@/types/Hero";
import Content from "./Content";

const HeroContent = ({ imageUrl, content }: Omit<HeroContent, "id">) => {
  return (
    <section className="w-full h-[calc(50vh-124px)] lg:h-[calc(100vh-124px)]">
      <div className=" h-[calc(50vh-124px)] lg:h-[calc(100vh-124px)] w-full absolute -z-10">
        <Image
          className=" h-[calc(50vh-124px)] lg:h-[calc(100vh-124px)] object-cover"
          src={imageUrl}
          alt={"backgroundImage"}
          layout="fill"
        />
      </div>
      <div className="content-wrapper">
        <div className="md:w-1/2 w-full xl:pt-25 md:pt-12.5 pt-2">
          <Content title={content.title} description={content.description} />
        </div>
      </div>
    </section>
  );
};

export default HeroContent;
