"use client";
import { useState } from "react";
import { ReactElement } from "react";
import { Trip } from "@/types/ImageCard";
import Image from "next/image";
import { Button } from "../ui/Button";
import BookingPopup from "../ui/Popup";
import IconContent from "../ui/IconContent";
import { createTripDetails } from "@/data/tripDetails";
import Link from "next/link";

const ImageCard = ({
  title: trip,
  coverImage: url,
  pricingOptions,
  priceTitle,
  priceDescription,
  departureTime: date,
  id: tripId,
  destination,
  totalSeats,
}: Trip): ReactElement => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const details = createTripDetails(
    destination,
    date,
    pricingOptions,
    totalSeats
  );
  return (
    <>
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-64">
          <Image className="object-cover" src={url} alt={trip} fill priority />
        </div>
        <div className="p-6 space-y-6 font-inter">
          <h2 className="text-xl font-semibold text-black">{trip}</h2>

          <div className="gap-4 grid grid-cols-2">
            {details.map((detail, index) => (
              <IconContent
                key={index}
                icon={detail.icon}
                content={detail.content}
              />
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Link href={`/trips/${tripId}`} className="w-1/2">
              <Button
                className="flex-1 bg-white text-black border border-black rounded-lg"
                variant="outline"
              >
                More Details
              </Button>
            </Link>
            <Button
              onClick={() => setSelectedTrip(tripId)}
              className="flex-1 bg-black text-white rounded-lg"
              variant="default"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      {selectedTrip && (
        <BookingPopup
          tripId={selectedTrip}
          setSelectedTrip={setSelectedTrip}
          priceTitle={priceTitle}
          priceDescription={priceDescription}
          pricingOptions={pricingOptions}
        />
      )}
    </>
  );
};

export default ImageCard;
