import TripList from "./TripList";

const TripsPage = async () => {
  let errorMessage: string = "";
  let initialTrips = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
      next: {
        tags: ["trips"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trips: ${response.statusText}`);
    }

    initialTrips = await response.json();
  } catch (error) {
    console.error("Error fetching trips:", error);
    errorMessage = "Failed to fetch trips";
  }

  return (
    <div className="p-6 xl:p-10 min-h-screen">
      <TripList error={errorMessage} initialTrips={initialTrips} />
    </div>
  );
};

export default TripsPage;
