"use client";

import { fetcher } from "@/lib/fetcher";
import { Trip } from "@/types/trip";
import useSWR from "swr";
import { useState } from "react";
import { Filter, X } from "lucide-react";
import ImageCard from "../ImageCardGrid/Card";
import FilterSidebar from "./FilterSider";
import { Button } from "@/components/ui/Button";

const TripsList = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const {
    data: trips,
    error: tripsError,
    isLoading: tripsLoading,
  } = useSWR<Trip[]>(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, fetcher);

  if (tripsError) {
    return <div>Error: {tripsError.message || "Failed to load trips"}</div>;
  }

  if (tripsLoading || !trips) {
    return <div>Loading...</div>;
  }

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  return (
    <section className="min-h-screen bg-site">
      <div className="lg:hidden sticky top-0 z-40 bg-site border-b border-gray-700 p-4">
        <Button
          onClick={toggleMobileFilter}
          variant="outline"
          className="flex items-center gap-2 bg-site-primary text-white border-site-secondary hover:bg-site-secondary"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-y-0 left-0 w-80 max-w-sm">
            <div className="relative h-full">
              <FilterSidebar
                tripsCount={trips.length}
                className="h-full overflow-y-auto"
              />
              <button
                onClick={toggleMobileFilter}
                className="absolute top-4 right-4 text-white hover:text-site-secondary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10"
            onClick={toggleMobileFilter}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 p-6">
        <div className="hidden lg:block lg:col-span-2">
          <FilterSidebar tripsCount={trips.length} />
        </div>

        <div className="lg:col-span-7 font-plusjakarta">
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
