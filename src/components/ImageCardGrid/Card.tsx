"use client";

import React, { useState } from "react";
import { ReactElement } from "react";
import { Card } from "@/types/ImageCard";
import Image from "next/image";
import { Button } from "../ui/Button";
import BookingPopup from "../ui/Popup/Booking";

const ImageCard = ({ place, url, price, date }: Card): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow rounded-3xl border hover:border-gray-400">
        <div className="p-2">
          <Image src={url} alt={"image"} width={500} height={390} />
        </div>
        <div className="flex flex-col gap-5 font-inter p-6">
          <h1 className="font-bold text-lg md:text-xl h-12">{place}</h1>
          <p className="font-medium text-base">{price}</p>
          <p className="font-normal text-base">{date}</p>
          <Button className="w-1/2" variant="outline">
            More Details
          </Button>
          <Button
            aria-label="book-now"
            className="mb-1.5"
            variant="default"
            onClick={() => setIsOpen(true)}
          >
            Book Now
          </Button>
        </div>
      </div>

      <BookingPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ImageCard;
