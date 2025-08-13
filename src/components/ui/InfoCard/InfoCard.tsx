"use client";

import { ReactElement } from "react";
import { InfoCard as InfoCardType } from "@/types/ImageCard";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  card: InfoCardType;
  className?: string;
}

const InfoCard = ({ card, className }: InfoCardProps): ReactElement => {
  return (
    <div 
      className={cn(
        "group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer",
        "border border-gray-100",
        className
      )}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image 
          src={card.image} 
          alt={card.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
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