"use client";
import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import PopUp from "@/components/PopUp";
import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      </div>
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
        cards={tripData.cards}
      />
      <PopUp />
    </>
  );
}
