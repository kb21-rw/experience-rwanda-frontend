// import GalleryGrid from "@/components/GalleryGrid";
// import TripHero from "@/components/Trip/TripHero";
// import TripPackage from "@/components/Trip/TripPackage";
import TripInfo from "@/components/Trip/TripInfo";
import { Button } from "@/components/ui/Button";
import { Trip } from "@/types/ImageCard";
import Image from "next/image";

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
  console.log("_____________________", tripDetails);
  return (
    <section className="min-h-screen bg-site text-gray-125 py-20">
      {/* <div>
        <TripHero tripDetails={tripDetails} />
      </div>
      {/* <TripPackage title="Trip Packages" /> */}
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-5 w-full gap-4">
          {/* div1 */}
          <div className="bg-red-400 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 order-2">
            {/* <TripHero tripDetails={tripDetails} /> */}
          </div>

          {/* div2 */}
          <div className="bg-green-400 md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-5 order-4">
            div2
          </div>

          {/* div3 */}
          <div className="bg-site/50 md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-4 order-1 w-full h-full overflow-hidden">
            <Image
              src={tripDetails.coverImage}
              alt={tripDetails.title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* div4 */}
          <div className="bg-yellow-400 md:col-start-1 md:col-end-4 md:row-start-5 md:row-end-6 order-5">
            div4
          </div>

          {/* div5 */}
          <div className="bg-purple-400 md:col-start-4 md:col-end-7 md:row-start-4 md:row-end-5 order-3">
            div5
          </div>

          {/* div6 */}
          <div className="bg-pink-400 md:col-start-4 md:col-end-7 md:row-start-5 md:row-end-6 order-6">
            <Button

            // onClick={() => setSelectedTrip(tripDetails.id)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TripDetailsPage;
