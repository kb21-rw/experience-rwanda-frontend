import type { Content } from "@/types/Hero";
import Image from "next/image";
import { Button } from "../ui/Button";

const Content = ({ title, description }: Content) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-32 items-center w-full">
      <div className="text-white text-center md:text-left flex flex-col gap-10 items-center md:items-start">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-5.8xl leading-none font-Figtree">
          {title}
        </h1>
        <p className="text-base font-normal font-inter">{description}</p>
        <Button>Explore</Button>
      </div>
      <div className="items-center justify-center hidden md:flex rounded-full overflow-hidden md:shadow-box">
        <Image
          src="/uploads/hero.jpg"
          alt="hero"
          width={700}
          height={700}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Content;
