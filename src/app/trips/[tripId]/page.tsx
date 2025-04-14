"use client";
import GalleryGrid from "@/components/GalleryGrid";
import TripPackage from "@/components/TripPackage";
import TripHero from "@/components/TripHero";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";

export default function TripDetailsPage({
  params,
}: {
  params: { tripId: string };
}) {
  const topRef = useRef<HTMLDivElement | null>(null);
  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="min-h-screen">
      <div ref={topRef}>
        <TripHero tripId={params.tripId} />
      </div>
      <TripPackage title="Trip Packages" />
      <GalleryGrid title="Gallery" />
      <div className="flex justify-center py-8">
        <Button variant="primary" onClick={handleScrollToTop}>
          Back to Top
        </Button>
      </div>
    </main>
  );
}
