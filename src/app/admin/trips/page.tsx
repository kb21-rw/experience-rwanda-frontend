import TripList from "./TripList";
import { Trip } from "@/types/ImageCard";

const Bookings = async () => {
  let trips: Trip[] = [];
  let errorMessage: string = "";
  let isLoading = true;
  try {
    const tripsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
      next: {
        tags: ["trips"],
      },
    });
    trips = await tripsRes.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    trips = [];
    errorMessage = "Failed to fetch bookings";
  } finally {
    isLoading = false;
  }
  return (
    <div>
      <TripList
        initialTrips={trips}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default Bookings;
