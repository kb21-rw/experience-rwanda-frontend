"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

const PopUp = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleContinueToCheckout = () => {
    setShowBooking(false);
    setTimeout(() => setShowCheckout(true), 200);
  };
  return (
    <div>
      <div className="flex justify-center mt-10">
        <Popover open={showBooking} onOpenChange={setShowBooking}>
          <PopoverTrigger asChild>
            <Button variant="default" onClick={() => setShowBooking(true)}>
              Book Now
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4 border border-gray-300 rounded-md bg-white shadow-md">
            <h1 className="text-sm font-medium">Book Trip</h1>
            <div className="mt-3">
              <label className="block text-xs font-medium">First Name</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                type="text"
              />
              <label className="block text-xs font-medium mt-2">
                Last Name
              </label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                type="text"
              />
              <label className="block text-xs font-medium mt-2">Email</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                type="email"
              />
            </div>
            <div className="mt-3 flex gap-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setShowBooking(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full"
                variant="default"
                onClick={handleContinueToCheckout}
              >
                Continue to Checkout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-center mt-10">
        <Popover open={showCheckout} onOpenChange={setShowCheckout}>
          <PopoverTrigger />
          <PopoverContent className="w-96 p-4 border border-gray-300 rounded-md bg-white shadow-md text-center">
            <h1 className="text-lg font-medium">Checkout</h1>
            <p className="text-sm mt-2">Payment Method</p>
            <div className="mt-3 text-left">
              <label className="block text-xs font-medium">
                <input type="radio" name="payment" className="mr-2" /> MTN
                Mobile Money
              </label>
              <label className="block text-xs font-medium mt-2">
                <input type="radio" name="payment" className="mr-2" />{" "}
                Credit/Debit Card
              </label>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </Button>
              <Button className="w-full" variant="default">
                Confirm Payment
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PopUp;
