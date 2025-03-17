import React from "react";
import Image from "next/image";
import type { HeroContent } from "@/types/Hero";
import Content from "./Content";

const HeroContent = ({ imageUrl, content }: Omit<HeroContent, "id">) => {
  return (
    <section className="w-full h-[calc(100vh-124px)] bg-red-500 bg-opacity-50">
      <div className="h-full">
        <Image src={imageUrl} alt={"backgroundImage"} fill />
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
