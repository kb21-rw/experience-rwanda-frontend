"use client";
import HeroContent from "@/components/HeroContent";
import heroData from "./../data/heroData.json";
import BookingPopup from "@/components/PopUp/Booking";
import CheckoutPopup from "@/components/PopUp/Checkout";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import CardDetailsPopup from "@/components/PopUp/CardDetails";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleProceedToCheckout = () => {
    setShowBooking(false);
    setTimeout(() => setShowCheckout(true), 200);
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      </div>
      <section id="home">{/* Home content */}</section>
      <section id="bookings">{/* Bookings content */}</section>
      <section id="about">{/* About content */}</section>
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      {/* <PopUp /> */}
      <div>
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
      </div>
    </div>
  );
}
