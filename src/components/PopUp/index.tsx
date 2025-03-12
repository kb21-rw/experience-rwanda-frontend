"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import BookingPopup from "./Booking";
import CardDetailsPopup from "./CardDetails";
import CheckoutPopup from "./Checkout";
import { Dialog } from "@radix-ui/react-dialog";

const PopUp = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleProceedToCheckout = () => {
    setShowBooking(false);
    setTimeout(() => setShowCheckout(true), 200);
  };
  return (
    <Dialog>
      <div className="flex justify-center mt-10">
        <Button variant="default" onClick={() => setShowBooking(true)}>
          Book Now
        </Button>
      </div>
      {showBooking && (
        <BookingPopup
          onProceed={handleProceedToCheckout}
          onClose={() => setShowBooking(false)}
        />
      )}
      {showCheckout && (
        <CheckoutPopup
          onClose={() => setShowCheckout(false)}
          onSelectCard={() => setShowCardDetails(true)}
        />
      )}
      {showCardDetails && (
        <CardDetailsPopup onClose={() => setShowCardDetails(false)} />
      )}
    </Dialog>
  );
};

export default PopUp;
