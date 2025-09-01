"use client";

import { useState, useEffect } from "react";
import { Trip } from "@/types/ImageCard";
import ImageCard from "@/components/ImageCardGrid/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

async function getFeaturedTrips(): Promise<Trip[]> {
  try {
    const res = await fetch(
      `https://experience-rwanda-backend-production-2210.up.railway.app/api/trips/all-with-deleted`,
      { next: { tags: ["trips", "featured-trips"] } }
    );
    if (!res.ok) throw new Error("fallback");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all?limit=6`, {
      next: { tags: ["trips"] },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
}

const FeaturedTrips = ({
  title = "Featured Trips",
  description = "Search trip that matches your personality. You will ave the best experiene ever",
}: {
  title?: string;
  description?: string;
}) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const tripsData = await getFeaturedTrips();
        setTrips(tripsData.slice(0, 6));
      } catch (err) {
        console.error("Error fetching featured trips:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch trips");
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <section className="bg-white">
        <div className="content-wrapper py-16 md:py-20">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-base md:text-lg text-black">
              {description}
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <div className="text-lg">Loading featured trips...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white">
        <div className="content-wrapper py-16 md:py-20">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-base md:text-lg text-black">
              {description}
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="content-wrapper py-16 md:py-20">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-base md:text-lg text-black">
            {description}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <ImageCard key={trip.id} {...trip} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/trips">
            <Button variant="default" className="px-6 py-3">View Trips</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;

