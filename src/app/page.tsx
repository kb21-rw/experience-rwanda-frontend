import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import { aboutUsData } from "@/data/about";
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { MailOpen } from "lucide-react";

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
      <Button icon={<MailOpen />} variant="outline">
  Login with Email
</Button>

      <ImageCardGrid
        id="trips"
        title={tripData.title}
        description={tripData.description}
      />
    </>
  );
}
