import type { Content } from "@/types/Hero";
import Image from "next/image";

const Content = ({ title, description }: Content) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center w-full">
      <div className="text-white text-center md:text-left flex flex-col gap-10 items-center md:items-start">
        <h1 className="font-bold xl:text-6xl text-xl md:text-4xl font-Figtree">
          {title}
        </h1>
        <p className="text-base font-normal md:text-lg font-inter">
          {description}
        </p>

        <button className="bg-site-secondary font-semibold text-site-primary py-2 px-6 ">
          Explore
        </button>
      </div>
      <div className="items-center justify-center hidden md:flex rounded-full overflow-hidden shadow-lg shadow-site-secondary/60">
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
