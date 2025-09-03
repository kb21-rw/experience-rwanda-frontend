"use client";

import { Trip } from "@/types/ImageCard";
import ImageCard from "@/components/ImageCardGrid/Card";
import FilterAndSearch from "@/components/FilterAndSearch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/utils/schemas/searchSchema";
import { z } from "zod";
import { useState, useEffect } from "react";

async function getAllTrips(): Promise<Trip[]> {
  try {
    const res = await fetch(
      `https://experience-rwanda-backend-production-2210.up.railway.app/api/trips/all-with-deleted`,
      { next: { tags: ["trips", "all-trips"] } }
    );
    if (!res.ok) throw new Error("fallback");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, {
      next: { tags: ["trips"] },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const tripsData = await getAllTrips();
        setTrips(tripsData);
        setFilteredTrips(tripsData);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch trips");
        setTrips([]);
        setFilteredTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const defaultFilters = {
    location: "",
    dateRange: undefined,
    price: {
      min: "",
      max: "",
    },
  };

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultFilters,
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    try {
    
      const filtered = trips.filter((trip) => {
        const matchesLocation = trip.destination
          .toLowerCase()
          .includes(values.location.toLowerCase()) ||
          trip.title.toLowerCase().includes(values.location.toLowerCase());

        const matchesDate =
          values.dateRange?.from !== undefined &&
          values.dateRange?.to !== undefined
            ? new Date(trip.departureTime) >= values.dateRange.from &&
              new Date(trip.departureTime) <= values.dateRange.to
            : true;

        const matchesPrice =
          values.price.min !== "" && values.price.max !== ""
            ? Number(trip.pricingOptions[0]?.amount || 0) >= Number(values.price.min) &&
              Number(trip.pricingOptions[0]?.amount || 0) <= Number(values.price.max)
            : true;

        return matchesLocation && matchesDate && matchesPrice;
      });

      setFilteredTrips(filtered);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="content-wrapper">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Trips</h1>
            <p className="text-lg text-gray-600 mb-8">Discover amazing adventures in Rwanda</p>
            <div className="flex justify-center items-center py-16">
              <div className="text-xl">Loading trips...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="content-wrapper">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Trips</h1>
            <p className="text-lg text-gray-600 mb-8">Discover amazing adventures in Rwanda</p>
            <div className="flex justify-center items-center py-16">
              <div className="text-xl text-red-600">Error: {error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="content-wrapper">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Trips</h1>
          <p className="text-lg text-gray-600">Discover amazing adventures in Rwanda</p>
        </div>

        <FilterAndSearch form={form} onSubmit={onSubmit} />

        {filteredTrips.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
            {filteredTrips.map((trip) => (
              <ImageCard key={trip.id} {...trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-xl text-gray-600 mb-4">
              {trips.length === 0 ? "No trips available" : "No trips match your search criteria"}
            </div>
            {trips.length > 0 && (
              <button
                onClick={() => {
                  form.reset();
                  setFilteredTrips(trips);
                }}
                className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
