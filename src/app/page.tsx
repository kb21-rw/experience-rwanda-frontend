import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import FeaturedTrips from "@/components/FeaturedTrips";
import { aboutUsData } from "@/data/about";
import Header from "@/components/Header";
import CustomizedTrip from "@/components/CustomizedTrip";
import LogoContent from "@/components/LogoContent";
import LogoContentData from "./../data/logoContent.json";
import { InfoCardGrid } from "@/components/ui/InfoCard";
import { rwandaHighlights } from "@/data/rwandaHighlights";

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

      <InfoCardGrid
        cards={rwandaHighlights}
        title="Discover Rwanda's Highlights"
        description="Explore the unique features and experiences that make Rwanda a must-visit destination"
      />

      <InfoCardGrid
        cards={rwandaHighlights}
        title="Discover Rwanda's Highlights"
        description="Explore the unique features and experiences that make Rwanda a must-visit destination"
      />

      <FeaturedTrips title={tripData.title} description={tripData.description} />
      <LogoContent {...LogoContentData} />
      <CustomizedTrip />
    </>
  );
}
