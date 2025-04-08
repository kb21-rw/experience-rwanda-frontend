"use client";
import { useMemo, useState } from "react";
import FilterAndSearch from "../FilterAndSearch";
import ImageCard from "./Card";
import { Card } from "@/types/ImageCard";
import NoResults from "../ui/NoResult";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../FilterAndSearch/searchSchema";
import { z } from "zod";

const TripList = ({ trips }: { trips: Card[] }) => {
  const [filters, setFilters] = useState<z.infer<typeof searchSchema>>({
    location: "",
    dateRange: {
      from: new Date(),
      to: undefined,
    },
    price: {
      min: "",
      max: "",
    },
  });

  const filteredTrips = useMemo(() => {
    return trips.filter((data) => {
      const matchesLocation = data.destination
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const matchesDate =
        filters.dateRange?.from !== undefined &&
        filters.dateRange?.to !== undefined
          ? new Date(data.departureTime) >= filters.dateRange?.from &&
            new Date(data.departureTime) <= filters.dateRange?.to
          : true;

      const matchesPrice =
        filters.price.min !== "" && filters.price.max !== ""
          ? data.price >= Number(filters.price.min) &&
            data.price <= Number(filters.price.max)
          : true;

      return matchesLocation && matchesDate && matchesPrice;
    });
  }, [
    filters.dateRange?.from,
    filters.dateRange?.to,
    filters.location,
    filters.price.max,
    filters.price.min,
    trips,
  ]);
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
      dateRange: {
        from: new Date(),
        to: undefined,
      },
      price: {
        min: "",
        max: "",
      },
    },
  });
  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    try {
      setFilters(values);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      <FilterAndSearch form={form} onSubmit={onSubmit} />
      {filteredTrips.length >= 1 ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          {filteredTrips.map((data: Card) => (
            <ImageCard key={data.id} {...data} />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mt-10">
          <NoResults
            message="Try to use different keywords"
            title="Clear the search"
            onClearSearch={() => form.reset()}
          />
        </div>
      )}
    </div>
  );
};

export default TripList;
