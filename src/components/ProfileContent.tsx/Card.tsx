import { PiUserCircle } from "react-icons/pi";

import Image from "next/image";
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
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    const nameInitials =
      firstName.charAt(0).toUpperCase() + lastName?.charAt(0).toUpperCase() ||
      name.charAt(1).toUpperCase();
    return (
      <div
        className={`aspect-square rounded-full flex items-center justify-center text-lg font-semibold bg-gray-200 text-gray-600 ${
          isExpanded ? "w-16 h-16" : "w-10 h-10"
        }`}
      >
        {nameInitials}
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
