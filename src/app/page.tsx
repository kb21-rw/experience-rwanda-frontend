import heroData from "./../data/heroData.json";
import HeroContent from "./components/HeroContent/index";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      </div>
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
    </div>
  );
}
