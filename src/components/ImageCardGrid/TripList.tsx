"use client";
import React, { useMemo, useState } from "react";
import FilterAndSearch from "../FilterAndSearch";
import ImageCard from "./Card";
import { Card } from "@/types/ImageCard";
import NoResults from "../ui/NoResult";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFormData, searchSchema } from "../FilterAndSearch/searchSchema";

const TripList = ({ trips }: { trips: Card[] }) => {
  const defaultFilters = useMemo(
    () => ({
      location: "",
      date: {
        from: new Date(),
        to: undefined,
      },
      price: {
        min: undefined,
        max: undefined,
      },
    }),
    []
  );

  const [filters, setFilters] = useState<SearchFormData>(defaultFilters);
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultFilters,
  });

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    setFilters(data);
  };

  const filteredTrips = useMemo(() => {
    return trips.filter((data) => {
      const matchesLocation = data.destination
        .toLowerCase()
        .includes(filters.location.toLowerCase());

      const matchesDate =
        filters.date?.from !== undefined && filters.date?.to !== undefined
          ? new Date(data.departureTime) >= filters.date.from &&
            new Date(data.departureTime) <= filters.date.to
          : true;

      const matchesPrice =
        filters.price?.min !== undefined && filters.price?.max !== undefined
          ? data.price >= filters.price.min && data.price <= filters.price.max
          : true;

      return matchesLocation && matchesDate && matchesPrice;
    });
  }, [
    filters.date.from,
    filters.date.to,
    filters.location,
    filters.price.max,
    filters.price.min,
    trips,
  ]);
  return (
    <div>
      <FilterAndSearch
        watch={watch}
        setValue={setValue}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
      />
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
            onClearSearch={reset}
          />
        </div>
      )}
    </div>
  );
};

export default TripList;
