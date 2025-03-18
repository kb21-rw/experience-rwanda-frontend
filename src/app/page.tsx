import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import AboutContent from "@/components/AboutContent";
import Toastify from "@/components/Toastify";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={null}>
      <Toastify />

      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <AboutContent />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
      />
    </Suspense>
  );
}
