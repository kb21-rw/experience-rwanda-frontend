import GalleryGrid from "@/components/GalleryGrid";
import TripPackage from "@/components/TripPackage";
import TripHero from "@/components/TripHero";
// import { Button } from "@/components/ui/Button";
import { TripDetails } from "@/types/ImageCard";
// import { useRef } from "react";

const TripDetailsPage = async ({ params }: { params: { tripId: string } }) => {
  // const topRef = useRef<HTMLDivElement | null>(null);
  // const handleScrollToTop = () => {
  //   if (topRef.current) {
  //     topRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
    {
      next: { revalidate: 600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trip details: ${response.statusText}`);
  }

  const tripDetails: TripDetails = await response.json();
  return (
    <main className="min-h-screen">
      <div>
        <TripHero tripDetails={tripDetails} />
      </div>
      <TripPackage title="Trip Packages" />
      <GalleryGrid title="Gallery" />
      <div className="flex justify-center py-8">
        {/* <Button variant="primary" onClick={handleScrollToTop}>
          Back to Top
        </Button> */}
      </div>
    </main>
  );
};
export default TripDetailsPage;
