import NewTripForm from "@/components/Trip/TripForm";
import { PricingOption } from "@/types/trip";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon } from "lucide-react";
import { format } from "date-fns";

type FormData = z.infer<typeof tripSchema>;

const EditTrip = async ({ params }: { params: { tripId: string } }) => {
  let tripData;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/trips/${params.tripId}`,
      {
        next: { tags: ["trips"] },
      }
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
    departureTime: format(new Date(tripData.departureTime), "yyyy-MM-dd'T'HH:mm"),
    returnTime: format(new Date(tripData.returnTime), "yyyy-MM-dd'T'HH:mm"),
    totalSeats: tripData.totalSeats.toString(),
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
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/trips">
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="place-self-center text-2xl font-semibold text-gray-900">
          Trips | Edit Trip
        </h1>
      </div>

      <NewTripForm defaultValues={defaultValues} tripId={params.tripId} />
    </div>
  );
};

export default EditTrip;
