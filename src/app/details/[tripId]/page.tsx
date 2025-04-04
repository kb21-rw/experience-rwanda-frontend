import { format } from "date-fns";
import Image from "next/image";

interface TripDetailsPageProps {
  params: {
    tripId: string;
  };
}

interface Trip {
  id: string;
  destination: string;
  price: number;
  departureTime: string;
  mainPicture: string;
}

const TripDetailsPage = async ({ params }: TripDetailsPageProps) => {
  const { tripId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return <div className="text-center p-10 text-red-500">Trip not found</div>;
  }

  const trip: Trip = await res.json();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Trip to {trip.destination}</h1>

      <div className="relative w-full h-96 mb-6">
        <Image
          src={trip.mainPicture}
          alt={trip.destination}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <p className="text-lg">Price: {trip.price} RWF</p>
      <p className="text-lg mb-6">
        Date: {format(new Date(trip.departureTime), "MMMM dd yyyy")}
      </p>

      <p className="text-base text-gray-700">
        This is a beautiful trip to {trip.destination}. Get ready to enjoy
        scenic views and an unforgettable experience!
      </p>
    </div>
  );
};

export default TripDetailsPage;
