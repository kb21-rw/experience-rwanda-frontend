import React from "react";
import Card from "./Card";
import { LogoCard, type LogoContent } from "@/types/LogoContent";

const LogoContent = ({ title, description, cards }: LogoContent) => {
  return (
    <section className="bg-site text-white py-30">
      <div className="content-wrapper flex flex-col gap-10 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-5.8xl leading-none font-Figtree">
            {title}
          </h1>
          <p className="text-base font-normal font-inter">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card: LogoCard) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoContent;
