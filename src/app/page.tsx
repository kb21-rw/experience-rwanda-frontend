import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import AboutContent from "@/components/About";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center">
      </div>
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <AboutContent />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
        cards={tripData.cards}
      />
    </>
  );
}
