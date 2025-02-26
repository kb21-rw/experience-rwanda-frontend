import homepage from "./../../public/data/homepage.json";
import HeroContent from "./components/HeroContent/Index";
import { Hero } from "@/types/Hero";

export default function Home() {
  const hero = homepage.data.attributes.hero;
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      </div>
      <HeroContent {...(hero as Hero)} />
    </div>
  );
}
