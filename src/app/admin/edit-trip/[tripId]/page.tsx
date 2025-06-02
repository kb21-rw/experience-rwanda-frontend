import NewTripForm from "@/components/TripForm";
import { PricingOption } from "@/types/trip";

const EditTrip = async ({ params }: { params: { tripId: string } }) => {
  const trip = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
    { cache: "no-cache" }
  );
  const tripData = await trip.json();
  const defaultValues = {
    title: tripData.title,
    destination: tripData.destination,
    description: tripData.description,
    departureTime: new Date(tripData.departureTime),
    returnTime: new Date(tripData.returnTime),
    seats: tripData.seats.toString(),
    coverImage: tripData.mainPicture,
    galleryImages: tripData.pictures,
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
