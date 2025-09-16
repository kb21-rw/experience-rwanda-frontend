"use client";

import { Dispatch, SetStateAction, useMemo } from "react";
import { ClientData } from "@/types/Popup";
import { PricingOption } from "@/types/trip";
import { Button } from "../Button";

type Step = "userInfo" | "summary" | "payment";

interface Props {
  setCurrentStep: Dispatch<SetStateAction<Step>>;
  clientData?: ClientData;
  pricingOptions: PricingOption[];
  tripTitle: string;
  destination: string;
  departureTime: string;
  returnTime: string;
  currency: string;
}

const Summary = ({
  setCurrentStep,
  clientData,
  pricingOptions,
  tripTitle,
  destination,
  departureTime,
  returnTime,
  currency,
}: Props) => {
  const { selectedPricing, totalCost } = useMemo(() => {
    const selected = pricingOptions.find(
      (opt) => opt.id === clientData?.pricingId
    );
    const seats = clientData?.bookedSeats ?? 0;
    const total = selected ? selected.amount * seats : 0;
    return { selectedPricing: selected, totalCost: total };
  }, [clientData?.pricingId, clientData?.bookedSeats, pricingOptions]);

  if (!clientData) {
    return (
      <div className="space-y-6">
        <p className="text-center text-sm text-gray-600">
          Missing traveler information. Please go back and fill the form.
        </p>
        <Button onClick={() => setCurrentStep("userInfo")} className="w-full" variant="secondary">
          Back to details
        </Button>
      </div>
    );
  }

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-6">Review your booking</h2>
      <div className="rounded-lg border p-4 space-y-3 text-sm">
        <div>
          <span className="font-semibold">Trip Title:</span> {tripTitle}
        </div>
        <div>
          <span className="font-semibold">Destination:</span> {destination}
        </div>
        <div>
          <span className="font-semibold">Departure:</span> {formatDateTime(
            departureTime
          )}
        </div>
        <div>
          <span className="font-semibold">Return:</span> {formatDateTime(
            returnTime
          )}
        </div>
        <div>
          <span className="font-semibold">Price:</span> {selectedPricing
            ? `${selectedPricing.amount} ${currency}`
            : "-"}
        </div>
        <div>
          <span className="font-semibold">Seats Booked:</span> {clientData.bookedSeats}
        </div>
        <div className="pt-3 mt-2 border-t">
          <span className="font-semibold">Total:</span> {`${totalCost} ${currency}`}
        </div>
        {selectedPricing?.description && (
          <p className="text-gray-600 text-xs">{selectedPricing.description}</p>
        )}
      </div>

      <div className="mt-5 flex gap-5">
        <Button onClick={() => setCurrentStep("userInfo")} variant="secondary" className="w-full">
          Back
        </Button>
        <Button onClick={() => setCurrentStep("payment")} variant="default" className="w-full">
          Proceed to payment
        </Button>
      </div>
    </div>
  );
};

export default Summary;



