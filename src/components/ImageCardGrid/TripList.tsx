"use client";
import React, { useMemo, useState } from "react";
import FilterAndSearch from "../FilterAndSearch";
import ImageCard from "./Card";
import { Card } from "@/types/ImageCard";
import { FormValues } from "@/types/searchAndFilter";

const TripList = ({ trips }: { trips: Card[] }) => {
  const [filters, setFilters] = useState<FormValues>({
    location: "",
    date: {
      from: undefined,
      to: undefined,
    },
    price: {
      min: undefined,
      max: undefined,
    },
  });

  const filteredTrips = useMemo(() => {
    return trips.filter((data) => {
      const matchesLocation = data.destination
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const matchesDate =
        filters.date?.from && filters.date?.to
          ? new Date(data.departureTime) >= filters.date.from &&
            new Date(data.departureTime) <= filters.date.to
          : true; // If no date filter is applied, allow all trips

      const matchesPrice =
        filters.price?.min && filters.price?.max
          ? data.price >= filters.price.min && data.price <= filters.price.max
          : true; // If no price filter is applied, allow all trips

      return matchesLocation && matchesDate && matchesPrice;
    });
  }, [trips, filters]);

  return (
    <div>
      <FilterAndSearch filters={filters} setFilters={setFilters} />
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
        {filteredTrips.map((data: Card) => (
          <ImageCard key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
};

export default TripList;
