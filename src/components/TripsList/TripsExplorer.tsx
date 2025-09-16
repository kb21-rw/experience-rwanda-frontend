"use client";

import { useState, useMemo } from "react";
import { Trip } from "@/types/trip";
import ImageCard from "../ImageCardGrid/Card";
import TripSearchBar from "./TripSearchBar";
import Link from "next/link";
import SearchNotFound from "../ui/SearchNotFound";
import FilterSidebar from "./FilterSider";
import Trips from "./Trips";
import {Button} from "@/components/ui/Button";

interface AllTripsListProps {
  defaultTrips: Trip[];
}

const AllTripsList = ({ defaultTrips }: AllTripsListProps) => {
  const [trips] = useState<Trip[]>(defaultTrips);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) return trips;
    const tokens = searchQuery
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return trips.filter((trip) => {
      const title = trip.title?.toLowerCase() || "";
      const destination = trip.destination?.toLowerCase() || "";

    
      const matchesTitle = tokens.every((token) => title.includes(token));
      const matchesDestination = tokens.every((token) => destination.includes(token));

      return matchesTitle || matchesDestination;
    });
  }, [trips, searchQuery]);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleClearSearch = () => setSearchQuery("");

  return (
    <section className="min-h-screen bg-site">
      <div className="bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-9 lg:px-16 lg:pt-6 lg:pb-2 px-6 pt-4 pb-1">
          <div className="lg:col-start-3 lg:col-span-7">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:gap-4">
              <TripSearchBar
                onSearch={handleSearch}
                placeholder="Search by title, location, or activity..."
                className="w-full"
              />
              <Button
                type="button"
                onClick={() => handleSearch(searchQuery)}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </Button>
              <Link href="/contact" className="hidden md:inline-flex">
                <Button
                  type="button"
                  className="h-12 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium"
                >
                  Customized Trip
                </Button>
              </Link>
            </div>
            {searchQuery && (
              <div className="mt-2">
                <p className="text-sm sm:text-base text-gray-600">
                  {filteredTrips.length} trip{filteredTrips.length !== 1 ? "s" : ""} found for {searchQuery}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Trips tripsLength={filteredTrips.length} />

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:p-16 p-6">
        <div className="hidden lg:block lg:col-span-2">
          <FilterSidebar tripsCount={filteredTrips.length} />
        </div>

        <div className="lg:col-span-7 font-plusjakarta">
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredTrips.map((trip: Trip) => (
                <ImageCard
                  key={trip.id}
                  id={trip.id}
                  title={trip.title}
                  coverImage={trip.coverImage}
                  pricingOptions={trip.pricingOptions || []}
                  departureTime={trip.departureTime}
                  totalSeats={trip.totalSeats}
                  totalBookedSeats={trip.totalBookedSeats || 0}
                  currency={trip.currency}
                  destination={trip.destination}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mt-8 sm:mt-10 px-4">
              <SearchNotFound
                title="Clear Search"
                message={
                  searchQuery
                    ? `No trips found for "${searchQuery}". Try different keywords or check your spelling.`
                    : "No trips available at the moment."
                }
                onClearSearch={searchQuery ? handleClearSearch : undefined}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllTripsList;


