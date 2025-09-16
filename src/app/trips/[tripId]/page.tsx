<<<<<<< HEAD
import Map from "@/components/Map";
import TripHero from "@/components/Trip/TripHero";
import IconContent from "@/components/ui/IconContent";
import { activities } from "@/data/activities";
import { doNotForget } from "@/data/doNotForget";
import { PricingOption, Trip } from "@/types/trip";
import Link from "next/link";
import { FaRunning } from "react-icons/fa";
import Image from "next/image";
import TripBookingWrapper from "@/components/Trip/TripBookingWrapper";
=======
import GalleryGrid from "@/components/GalleryGrid";
import TripHero from "@/components/TripHero";
import { Trip } from "@/types/trip";
>>>>>>> origin

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
    <section className="min-h-screen bg-site text-gray-125 pt-8 md:pt-12 lg:pt-16">
      <div className="content-wrapper">
        <Link
          href="/"
          className="hidden md:block text-base font-semibold -top-4"
        >
          <span className="mr-1 font-semibold">←</span>Back
        </Link>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="order-1 md:order-2 flex flex-col gap-8">
            <div className="block md:hidden">
              <TripHero tripDetails={tripDetails} />
            </div>

            <div>
              <Image
                src={tripDetails.coverImage}
                alt={tripDetails.title}
                width={600}
                height={600}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <div className="bg-site/30 py-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Pricing Options
              </h2>
              <div className="space-y-3 mb-6">
                {tripDetails.pricingOptions.map((option: PricingOption) => (
                  <div
                    key={option.id}
                    className="grid grid-cols-2 first-letter:items-center justify-between gap-4"
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

          <div className="order-2 md:order-1 flex flex-col gap-8">
            <div className="hidden md:block">
              <TripHero tripDetails={tripDetails} />
            </div>

            {activities && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-2xl">Activities</h2>
                <p className="text-gray-300 mb-4">{tripDetails.description}</p>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {activities.map((activity, index) => (
                    <IconContent
                      key={index}
                      icon={FaRunning}
                      content={activity}
                      className="flex items-center gap-3"
                    />
                  ))}
                </div>
              </div>
            )}

            {doNotForget && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-2xl">Do Not Forget</h2>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {doNotForget.map((item, index) => (
                    <IconContent
                      key={index}
                      icon={FaRunning}
                      content={item}
                      className="flex items-center gap-3"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
<<<<<<< HEAD

      <div className="mt-12">
  <Map
    locations={[
      {
        lat: tripDetails.fromLocation.latitude,
        lng: tripDetails.fromLocation.longitude,
        name: tripDetails.fromLocation.name,
      },
      {
        lat: tripDetails.toLocation.latitude,
        lng:tripDetails.toLocation.longitude,
        name: tripDetails.toLocation.name,
      },
    ]}
    zoom={10}
    height="400px"
    width="100%"
  />
</div>
    </section>
=======
      <GalleryGrid title="Gallery" />
    </main>
>>>>>>> origin
  );
};

export default TripDetailsPage;
