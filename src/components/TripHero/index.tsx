"use client";
import { Card as TripDetails } from "@/types/ImageCard";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import IconContent from "../ui/IconContent";
import { createTripDetails } from "@/data/tripDetails";

const TripHeroCard = ({ tripId }: { tripId: string }) => {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

  const fetchTripDetails = useMemo(
    () => async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}` || "",
          {
            next: { revalidate: 600 },
          }
        );
        const data = await response.json();
        setTripDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [tripId]
  );

  useEffect(() => {
    fetchTripDetails();
  }, [fetchTripDetails]);

  if (!tripDetails) {
    return <div className="text-center">Loading...</div>;
  }
  const details = createTripDetails(
    tripDetails.destination,
    tripDetails.departureTime,
    tripDetails.price,
    tripDetails.seats
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold p-12 ">
        {tripDetails.title}
      </h1>
      <div className="relative w-full md:h-[600px] mb-8">
        <Image
          src={tripDetails.mainPicture}
          alt={tripDetails.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="gap-4 grid grid-cols-2 font-inter ">
        {details.map((detail, index) => (
          <IconContent
            key={index}
            icon={detail.icon}
            content={detail.content}
          />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mt-8">Description</h2>
        <p className="text-base mt-4">{tripDetails.description}</p>
      </div>
    </div>
  );
};

export default TripHeroCard;
