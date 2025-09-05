"use client";

import { Button } from "@/components/ui/Button";
import BookingPopup from "@/components/ui/Popup";
import { Trip } from "@/types/ImageCard";
import { useState } from "react";

interface TripBookingWrapperProps {
  tripDetails: Trip;
}

const TripBookingWrapper = ({ tripDetails }: TripBookingWrapperProps) => {
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  return (
    <>
      <Button
        variant="default"
        onClick={() => setSelectedTrip(tripDetails.id)}
      >
        Book Now
      </Button>
      
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

export default TripBookingWrapper;