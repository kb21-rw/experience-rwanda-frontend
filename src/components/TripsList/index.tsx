"use client";

import { fetcher } from "@/lib/fetcher";
import { Trip } from "@/types/trip";
import useSWR from "swr";
import ImageCard from "../ImageCardGrid/Card";
import FilterSidebar from "./FilterSider";

const TripsList = () => {
  const {
    data: trips,
    error: tripsError,
    isLoading: tripsLoading,
  } = useSWR<Trip[]>(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, fetcher);
  
  console.log("Isloading", tripsLoading);
  console.log("Trips:", trips);

  if (tripsError) {
    return <div>Error: {tripsError.message || 'Failed to load trips'}</div>;
  }

  if (tripsLoading || !trips) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-screen bg-site">
      <div className="grid grid-cols-9 gap-6 p-6">
        <div className="col-span-2">
          <FilterSidebar tripsCount={trips.length} />
        </div>
        <div className="col-span-7 font-plusjakarta">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <ImageCard
                key={trip.id}
                id={trip.id}
                title={trip.title}
                coverImage={trip.coverImage}
                pricingOptions={trip.pricingOptions}
                departureTime={trip.departureTime}
                totalSeats={trip.totalSeats}
                totalBookedSeats={trip.totalBookedSeats}
                currency={trip.currency}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripsList;