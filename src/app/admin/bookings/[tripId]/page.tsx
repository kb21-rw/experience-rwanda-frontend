"use client";
import BookingList from "./BookingList";

const Bookings = () => {
  return (
    <div className="min-h-screen px-16 xl:px-20 py-6 xl:py-10 gap-2 flex items-start w-full">
      <BookingList />
    </div>
  );
};

export default Bookings;
