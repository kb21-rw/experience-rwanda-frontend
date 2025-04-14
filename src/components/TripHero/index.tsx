import { TripDetails } from "@/types/ImageCard";
import TripHeroCard from "./Card";

const TripHero = async ({ tripId }: { tripId: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`,
    {
      next: { revalidate: 600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trip details: ${response.statusText}`);
  }

  const tripDetails: TripDetails = await response.json();

  return <TripHeroCard tripDetails={tripDetails} />;
};

export default TripHero;
