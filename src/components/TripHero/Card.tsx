"use client";

import { useState } from "react";
import { TripDetails } from "@/types/ImageCard";
import Image from "next/image";
import IconContent from "../ui/IconContent";
import Link from "next/link";
import { Button } from "../ui/Button";
import BookingPopup from "../ui/Popup";
import { createTripDetails } from "@/data/tripDetails";

interface Props {
  tripDetails: TripDetails;
}

const TripHeroCard = ({ tripDetails }: Props) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const details = createTripDetails(
    tripDetails.destination,
    tripDetails.departureTime,
    tripDetails.price,
    tripDetails.seats
  );

  return (
    <>
      <div className="content-wrapper">
        <div className="flex justify-between py-10">
          <Link href="/" className="text-base font-semibold">
            ←Back
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
            src={tripDetails.mainPicture}
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
            />
          ))}
        </div>

        <div className="py-20">
          <h2 className="text-2xl font-bold mt-8">Description</h2>
          <p className="text-base mt-4">{tripDetails.description}</p>
        </div>
      </div>

      {selectedTrip && (
        <BookingPopup tripId={selectedTrip} setSelectedTrip={setSelectedTrip} />
      )}
    </>
  );
};

export default TripHeroCard;
