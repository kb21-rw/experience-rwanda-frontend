import { PiUserCircle } from "react-icons/pi";

import Image from "next/image";
import { getNameInitials } from "@/utils/helper";
interface ProfileProps {
  imageSrc: string;
  name: string;
  isExpanded: boolean;
  alt: string;
  className?: string;
}
export default function ProfileCard({
  imageSrc,
  name,
  isExpanded,
  alt,
  className,
}: ProfileProps) {
  if (!imageSrc && !name) {
    return <PiUserCircle size={isExpanded ? 60 : 40} />;
  }
  if (!imageSrc && name) {
    return (
      <div
        className={`aspect-square rounded-full flex items-center justify-center text-lg font-semibold bg-gray-200 text-gray-600 ${
          isExpanded ? "w-16 h-16" : "w-10 h-10"
        }`}
      >
        {getNameInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      width={100}
      height={100}
      alt={alt}
      className={`rounded-full object-cover aspect-square ${className}`}
    />
  );
}
