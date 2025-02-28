import { Hero } from "@/types/Hero";
type ContentProps = Omit<Hero, "__component" | "backgroundImage" | "id">;

const HeroCard = ({ title, description }: ContentProps) => {
  return (
    <div className="text-white">
      <h1 className="font-bold xl:text-6xl text-xl md:text-4xl font-Figtree">
        {title}
      </h1>
      <p className="text-lg xl:pt-13.5 pt-5 border-b-2 border-gray-500 font-inter">
        {description}
      </p>
    </div>
  );
};

export default HeroCard;
