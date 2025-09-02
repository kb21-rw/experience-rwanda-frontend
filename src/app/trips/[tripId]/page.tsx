import TripHero from "@/components/Trip/TripHero";
import IconContent from "@/components/ui/IconContent";
import { activities } from "@/data/activities";
import { Trip } from "@/types/ImageCard";
import Image from "next/image";
import { FaRunning } from "react-icons/fa";
import TripBookingWrapper from "@/components/Trip/TripBookingWrapper";
import Map from "@/components/Map";
import { doNotForget } from "@/data/doNotForget";

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
    <section className="min-h-screen bg-site text-gray-125 pt-8 md:pt-12 lg:pt-16 border-yellow-300 border-2">
      <div className="content-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-5 w-full gap-4">
          <div className="md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-3 order-2">
            <TripHero tripDetails={tripDetails} />
          </div>
          <div className="md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-5 order-4">
            {activities && <div className="mb-12 space-y-6">
              <h2 className="font-bold text-2xl">Activities</h2>
              <p>{tripDetails.description}</p>
              <div className="px-4 grid grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <IconContent
                    key={index}
                    icon={FaRunning}
                    content={activity}
                  />
                ))}
              </div>
            </div>}
           {doNotForget && <div className="space-y-6 mb-10">
              <h2 className="font-bold text-2xl">Do not forget</h2>
              <p>{tripDetails.description}</p>
              <div className="px-4 grid grid-cols-2 gap-4">
                {doNotForget.map((item, index) => (
                  <IconContent
                    key={index}
                    icon={FaRunning}
                    content={item}
                  />
                ))}
              </div>
            </div>}
          </div>

          <div className="md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-4 order-1 overflow-hidden border flex flex-col">
            <Image
              src={tripDetails.coverImage}
              alt={tripDetails.title}
              width={600}
              height={600}
              className="object-cover rounded-lg"
            />
          </div>

         
          <div className="bg-site/30 md:col-start-4 md:col-end-7 md:row-start-4 md:row-end-5 order-3">
            <h2 className="text-2xl font-bold text-white mb-4">
              Pricing Options
            </h2>
            <div className="space-y-3 mb-6">
              {tripDetails.pricingOptions.map((option: any) => (
                <div
                  key={option.id}
                  className="flex items-center justify-start gap-8"
                >
                
                  <IconContent
                    icon={FaRunning}
                    content={option.name}
                    className="bg-green-700 rounded-full p-2"
                  />
                  <span className="text-white font-semibold">
                    {option.amount.toLocaleString()} Rwf
                  </span>
                </div>
              ))}
            </div>
            <TripBookingWrapper tripDetails={tripDetails} />
          </div>

         
        </div>
      </div>

      <Map
        location={{
          lat: -1.9441,
          lng: 30.0619,
          name: "Kigali, Rwanda",
        }}
        zoom={12}
        height="400px"
        width="100%"
        className="mt-12"
      />
    </section>
  );
};

export default TripDetailsPage;
