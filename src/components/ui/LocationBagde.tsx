"use client";

import { Badge } from "@/components/ui/badge";
import  { useRef, useEffect } from "react";

interface TripLocationBadgeProps {
  location: string;
  isActive: boolean;
  onClick: () => void;
}

const TripLocationBadge = ({ location, isActive, onClick }: TripLocationBadgeProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && badgeRef.current) {
      badgeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [isActive]);

  return (
    <div ref={badgeRef}>
      <Badge
        onClick={onClick}
        className={`cursor-pointer w-auto whitespace-nowrap p-2 transition-colors ${
          isActive
            ? "bg-green-700 text-white"
            : "bg-gray-400 hover:bg-gray-500 text-gray-200"
        }`}
      >
        {location}
      </Badge>
    </div>
  );
};

export default TripLocationBadge;
