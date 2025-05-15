import Image from 'next/image';
interface ProfileProps {
    imageSrc: string,
    alt: string,
    className?: string
}
export default function ProfileCard({ imageSrc, alt, className }: ProfileProps) {
  return (
    <Image
      src={imageSrc}
      width={100}
      height={100}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
