"use client";

import { useState } from "react";
import Image from "next/image";
import IconContent from "../ui/IconContent";
import Link from "next/link";
import { Button } from "../ui/Button";
import BookingPopup from "../ui/Popup";
import { createTripDetails } from "@/data/tripDetails";
import { Trip } from "@/types/trip";

interface Props {
  tripDetails: Trip;
}

const TripHeroCard = ({ tripDetails }: Props) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const details = createTripDetails(
    tripDetails.destination,
    tripDetails.departureTime,
    tripDetails.totalSeats
  );

  const getImageSrc = (imageUrl: string) => {
    if (!imageUrl || imageUrl === "") return "/uploads/akagera.png";
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("/uploads/")) return imageUrl;
    return `/uploads/${imageUrl}`;
  };

  const src = getImageSrc(tripDetails.coverImage);

  return (
    <>
      <div className="content-wrapper">
        <div className="flex justify-between py-10 items-center">
          <Link href="/" className="text-base font-semibold">
            <span className="mr-1 font-semibold">←</span>Back
          </Link>
          <h1 className="text-center text-4xl font-bold">
            {tripDetails.title}
          </h1>
          <Button
            variant="default"
            onClick={() => setSelectedTrip(tripDetails.id)}
          >
            Book Now
          </Button>
        </div>

        <div className="relative w-full md:h-[600px] mb-8">
          <Image
            src={src}
            alt={tripDetails.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="gap-4 grid grid-cols-2 font-inter">
          {details.map((detail, index) => (
            <IconContent
              key={index}
              icon={detail.icon}
              content={detail.content}
              className="bg-black p-3 rounded-full text-white"
            />
          ))}
        </div>

        <div className="py-20">
          <h2 className="text-2xl font-bold mt-8">Description</h2>
          <p className="text-base mt-4">{tripDetails.description}</p>
        </div>
      </div>

      {selectedTrip && (
        <BookingPopup
          tripId={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          priceTitle={tripDetails.priceTitle}
          priceDescription={tripDetails.priceDescription}
          pricingOptions={tripDetails.pricingOptions || []}
          tripTitle={tripDetails.title}
          destination={tripDetails.destination}
          departureTime={tripDetails.departureTime}
          returnTime={tripDetails.returnTime}
          currency={tripDetails.currency}
        />
      )}
    </>
  );
};

export default TripHeroCard;
