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
          <div className="absolute inset-0" onClick={toggleMobileFilter} />

          <div
            className={`
            absolute bottom-0 left-0 right-0 
            bg-site-primary rounded-t-3xl 
            transform transition-transform duration-300 ease-out
            ${showMobileFilter ? "translate-y-0" : "translate-y-full"}
            max-h-[85vh] overflow-hidden
          `}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
            </div>

            <div className="absolute top-4 right-6 z-10">
              <button
                onClick={toggleMobileFilter}
                className="text-white hover:text-site-secondary transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-60px)]">
              <FilterSidebar
                tripsCount={trips.length}
                className="rounded-t-3xl border-0"
                onClose={toggleMobileFilter}
              />
            </div>
          </div>
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
