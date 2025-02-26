import { Hero as HeroType } from "@/types/Hero";
type ContentProps = Omit<HeroType, "__component" | "backgroundImage" | "id">;
const HeroCard = ({ title, description }: ContentProps) => {
  return (
    <div className="text-white">
      <h1 className="font-bold text-6xl font-Figtree">{title}</h1>
      <p className="text-lg pt-[54px]  border-b-2 border-gray-500 font-inter">
        {description}
      </p>
    </div>
  );
};

export default HeroCard;
