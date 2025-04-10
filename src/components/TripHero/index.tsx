import { TripDetails } from "@/types/ImageCard";
import Image from "next/image";
import IconContent from "../ui/IconContent";
import { createTripDetails } from "@/data/tripDetails";

const TripHeroCard = async ({ tripId }: { tripId: string }) => {
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

  const details = createTripDetails(
    tripDetails.destination,
    tripDetails.departureTime,
    tripDetails.price,
    tripDetails.seats
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold p-12 ">
        {tripDetails.title}
      </h1>
      <div className="relative w-full md:h-[600px] mb-8">
        <Image
          src={tripDetails.mainPicture}
          alt={tripDetails.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="gap-4 grid grid-cols-2 font-inter ">
        {details.map((detail, index) => (
          <IconContent
            key={index}
            icon={detail.icon}
            content={detail.content}
          />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mt-8">Description</h2>
        <p className="text-base mt-4">{tripDetails.description}</p>
      </div>
    </div>
  );
};

export default TripHeroCard;
