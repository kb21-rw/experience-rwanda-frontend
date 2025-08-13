"use client";

import { ReactElement } from "react";
import { InfoCard as InfoCardType } from "@/types/ImageCard";
import InfoCard from "./InfoCard";

interface InfoCardGridProps {
  cards: InfoCardType[];
  title?: string;
  description?: string;
  className?: string;
}

const InfoCardGrid = ({ 
  cards, 
  title = "Discover Rwanda's Highlights",
  description = "Explore the unique features and experiences that make Rwanda a must-visit destination",
  className 
}: InfoCardGridProps): ReactElement => {
  return (
    <section className={`py-16 bg-gray-50 ${className || ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCardGrid; 