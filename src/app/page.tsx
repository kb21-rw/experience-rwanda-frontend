import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center"></div>
      <section id="home">{/* Home content */}</section>
      <section id="bookings">{/* Bookings content */}</section>
      <section id="about">{/* About content */}</section>
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
      />
    </>
  );
}
