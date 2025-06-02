import NewTripForm from "@/components/TripForm";
import { PricingOption } from "@/types/trip";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { z } from "zod";

type FormData = z.infer<typeof tripSchema>;

const EditTrip = async ({ params }: { params: { tripId: string } }) => {
  let tripData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
      { cache: "no-cache" }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch trip: ${res.status}`);
    }

    tripData = await res.json();
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw new Error("Trip not found or failed to load.");
  }
  const defaultValues: FormData = {
    title: tripData.title,
    destination: tripData.destination,
    description: tripData.description,
    departureTime: new Date(tripData.departureTime),
    returnTime: new Date(tripData.returnTime),
    seats: tripData.seats.toString(),
    coverImage: tripData.coverImage,
    galleryImages: tripData.galleryImages,
    pricingOptions: tripData.pricingOptions?.map((option: PricingOption) => ({
      name: option.name,
      amount: option.amount.toString(),
      description: option.description,
    })),
  };
  return (
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | Edit Trip
        </h1>
      </div>

      <NewTripForm defaultValues={defaultValues} tripId={params.tripId} />
    </div>
  );
};

export default EditTrip;
