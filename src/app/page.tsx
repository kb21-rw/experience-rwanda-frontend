import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";
import Toastify from "@/components/Toastify";
import { Suspense } from "react";
import { aboutUsData } from "@/data/about";
import Header from "@/components/Header";
import TripPackage from "@/components/TripPackage";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Toastify />

      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <Header
        title={aboutUsData.title}
        description={aboutUsData.description}
        variant={aboutUsData.variant}
      />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
      />
      <TripPackage title="Trip Packages" />
    </Suspense>
  );
}
