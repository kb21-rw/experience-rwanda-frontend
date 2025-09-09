import GalleryGrid from "@/components/GalleryGrid";
import TripHero from "@/components/TripHero";
import { Trip } from "@/types/trip";

const TripDetailsPage = async ({ params }: { params: { tripId: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
    {
      next: { tags: ["trips"] },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trip details: ${response.statusText}`);
  }

  const tripDetails: Trip = await response.json();
  return (
    <main className="min-h-screen">
      <div>
        <TripHero tripDetails={tripDetails} />
      </div>
      <GalleryGrid title="Gallery" />
    </main>
  );
};
export default TripDetailsPage;
