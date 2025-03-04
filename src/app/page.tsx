import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";

export default function Home() {
  return (
    <>
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
        cards={tripData.cards}
      />
    </>
  );
}
