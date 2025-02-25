import { ImageProps } from "@/types/Hero";
import Image from "next/image";

const HeroCard = ({ name, url, width, height }: ImageProps) => {
  return (
    <div>
      <Image src={url} width={width} height={height} alt={name} />
    </div>
  );
};

export default HeroCard;
