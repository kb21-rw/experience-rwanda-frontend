"use client";

import { Badge } from "@/components/ui/badge";

interface TripLocationBadgeProps {
  location: string;
  isActive: boolean;
  onClick: () => void;
}

const TripLocationBadge = ({ location, isActive, onClick }: TripLocationBadgeProps) => {
  return (
    <Badge
      onClick={onClick}
      className={`cursor-pointer w-auto whitespace-nowrap p-2 transition-colors ${
        isActive
          ? "!bg-green-700 !text-white"
          : "!bg-gray-400 hover:!bg-gray-500 !text-gray-200"
      }`}
    >
      {location}
    </Badge>
  );
};

export default TripLocationBadge;

