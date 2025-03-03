import React from "react";
import Image from "next/image";
import type { HeroContent } from "@/types/Hero";
import Content from "./Content";

const HeroContent = ({ imageUrl, content }: Omit<HeroContent, "id">) => {
  return (
    <section className="w-full h-screen">
      <div className="absolute -z-50 inset-0">
        <Image
          src={imageUrl}
          alt={"backgroundImage"}
          layout="responsive"
          width={1000}
          height={1000}
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
