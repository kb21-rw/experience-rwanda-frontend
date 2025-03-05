import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import Header from "@/components/Header";

export default function Home() {
  return (
   
      
    <div>
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>

      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <Header />
    </div>
  );
}
