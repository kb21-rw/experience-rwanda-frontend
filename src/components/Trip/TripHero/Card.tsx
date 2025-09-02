"use client";

import { useState } from "react";
import { Trip } from "@/types/ImageCard";
import IconContent from "../../ui/IconContent";
import Link from "next/link";
import BookingPopup from "../../ui/Popup";
import { createTripDetails } from "@/data/tripDetails";

interface Props {
  tripDetails: Trip;
}

const TripHeroCard = ({ tripDetails }: Props) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const details = createTripDetails(
    tripDetails.destination,
    tripDetails.departureTime,
    tripDetails.returnTime,
    tripDetails.totalSeats
  );
  return (
    <>
      <div className="flex flex-col justify-start gap-4 items-start">
        <Link href="/" className="hidden md:block text-base font-semibold">
          <span className="mr-1 font-semibold">←</span>Back
        </Link>
        <div className="flex flex-col gap-2 justify-start items-start text-gray-200">
          <h1 className="text-center text-3xl md:text-4xl font-bold">{tripDetails.title}</h1>
          <p>{tripDetails.description}</p>
        </div>
      </div>

      <div className="gap-2 grid grid-cols-2 font-inter mt-8">
        {details.map((detail, index) => (
          <IconContent
            key={index}
            icon={detail.icon}
            content={detail.content}
            className="p-2 rounded-full text-white text-sm"
          />
        ))}
      </div>
      {selectedTrip && (
        <BookingPopup
          tripId={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          priceTitle={tripDetails.priceTitle}
          priceDescription={tripDetails.priceDescription}
          pricingOptions={tripDetails.pricingOptions}
        />
      )}
    </>
  );
};

export default TripHeroCard;
