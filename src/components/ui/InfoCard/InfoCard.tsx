"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Card {
  image: string;
  title: string;
  description: string;
}

interface InfoCardProps {
  card: Card;
  className?: string;
}

const InfoCard = ({ card, className }: InfoCardProps): ReactElement => {
  return (
    <div
      className={cn(
        "group bg-transparent md:bg-white transition-all duration-300 cursor-pointer border-0 border-none outline-none shadow-none hover:shadow-none md:hover:scale-105",
        "",
        className
      )}
    >
      <div className="relative w-full h-60 md:h-48 rounded-none border-0 ring-0 outline-none">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-300 md:group-hover:scale-110 rounded-none"
          priority
        />
      </div>

      <div className="px-6 pt-6 pb-3 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-200">
          {card.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
