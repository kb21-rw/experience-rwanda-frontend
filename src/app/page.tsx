import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import { aboutUsData } from "@/data/about";
import Header from "@/components/Header";
import CustomizedTrip from "@/components/CustomizedTrip";
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

      <ImageCardGrid
        id="trips"
        title={tripData.title}
        description={tripData.description}
      />
      <CustomizedTrip />
      <LogoContent {...LogoContentData} />
    </>
  );
}
