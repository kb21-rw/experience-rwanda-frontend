"use client";

import { TripDetails } from "@/types/ImageCard";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";


const TripHeroCard = ({ tripId }: { tripId: string }) => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  const fetchTripDetails = useMemo(() => async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}` || "", {
        next: { revalidate: 600 },
      });
      const data = await response.json();
      setTripDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [tripId]);
  
  useEffect(() => {
    fetchTripDetails();
  }, [fetchTripDetails]);

  if (!tripDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold p-12 ">{tripDetails.title}</h1>
      <div className="relative w-full md:h-[600px] mb-8">
        <Image
          src={tripDetails.mainPicture}
          alt={tripDetails.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            {tripDetails.description}
          </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{tripDetails.price.toLocaleString()} RWF</h3>
            <p className="text-gray-600">per person</p>
            <div className="h-px bg-gray-200 my-4" />
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Available seats</span>
                <span className="font-semibold">{tripDetails.seats}</span>
              </p>
              <p className="flex justify-between">
                <span>Duration</span>
                <span className="font-semibold">1 day</span>
              </p>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
  );
};

export default TripHeroCard;
