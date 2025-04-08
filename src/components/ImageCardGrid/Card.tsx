"use client";
import React, { useState } from "react";
import { ReactElement } from "react";
import { TripDetails } from "@/types/ImageCard";
import Image from "next/image";
import { Button } from "../ui/Button";
import { format } from "date-fns";
import BookingPopup from "../ui/Popup";
import Link from "next/link";

const ImageCard = ({
  destination: place,
  mainPicture: url,
  price,
  departureTime: date,
  id: tripId,
}: TripDetails): ReactElement => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  return (
    <>
      <div className="bg-white shadow rounded-3xl hover:bg-op ease-in-out duration-300">
        <div className="p-3 flex justify-center">
          <div className="relative w-full h-80">
            <Image
              className="object-cover rounded-3xl"
              src={url}
              alt={"image"}
              fill
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 font-inter p-6">
          <h1 className="font-bold text-lg md:text-xl h-12">Place: {place}</h1>
          <p className="font-medium text-base">Price: {price} RWF</p>
          <p className="font-normal text-base">
            Date: {format(date, "MMMM dd yyyy")}
          </p>
          <Link href={`/tripDetails/${tripId}`} className="w-1/2">
            <Button className="w-full" variant="outline">
              More Details
            </Button>
          </Link>
          <Button
            onClick={() => setSelectedTrip(tripId)}
            className="mb-1.5"
            variant="default"
          >
            Book Now
          </Button>
        </div>
      </div>
      {selectedTrip && (
        <BookingPopup tripId={selectedTrip} setSelectedTrip={setSelectedTrip} />
      )}
    </>
  );
};

export default ImageCard;
