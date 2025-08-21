import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import FeaturedTrips from "@/components/FeaturedTrips";
import { aboutUsData } from "@/data/about";
import Header from "@/components/Header";
import LogoContent from "@/components/LogoContent";
import LogoContentData from "./../data/logoContent.json";

export default function Home() {
  return (
    <>
      <HeroContent
        id="home"
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <Header
        id="about"
        title={aboutUsData.title}
        description={aboutUsData.description}
        variant={aboutUsData.variant}
      />

      <FeaturedTrips title={tripData.title} description={tripData.description} />
      <LogoContent {...LogoContentData} />
    </>
  );
}
