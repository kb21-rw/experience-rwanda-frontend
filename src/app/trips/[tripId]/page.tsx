import GalleryGrid from "@/components/GalleryGrid";
import TripHero from "@/components/TripHero";
import { Trip } from "@/types/ImageCard";

const TripDetailsPage = async ({ params }: { params: { tripId: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
    {
      next: { revalidate: 600 },
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
      {/* <TripPackage title="Trip Packages" /> */}
      <GalleryGrid title="Gallery" />
    </main>
  );
};
export default TripDetailsPage;
