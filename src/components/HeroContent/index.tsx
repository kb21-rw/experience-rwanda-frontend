import React from "react";
import Image from "next/image";
import type { HeroContent } from "@/types/Hero";
import Content from "./Content";

const HeroContent = ({ id, content }: HeroContent) => {
  return (
    <section
      id={id}
      className="relative w-full h-[calc(100vh-5rem)] bg-site flex items-center justify-center"
    >
      <div
        className="absolute inset-0 md:top-0 md:left-1/2 md:-translate-x-1/2 md:inset-auto md:mt-48 lg:mt-20 md:h-40 md:w-40 
      rounded-none md:rounded-full overflow-hidden shadow-none md:shadow-box"
      >
        <Image
          src="/uploads/hero.jpg"
          alt={content.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 md:hidden" />
      </div>

      <div className="content-wrapper relative z-10 text-[#cccccc]">
        <Content title={content.title} description={content.description} />
      </div>
    </section>
  );
};

export default HeroContent;
