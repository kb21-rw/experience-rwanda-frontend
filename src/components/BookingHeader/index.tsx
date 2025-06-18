"use client";

import { useMemo } from "react";
import useSWR from "swr";
import BookingCircularProgressbar from "./CircularProgressBar";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { useParams } from "next/navigation";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
};

const BookingHeader = () => {
  const params = useParams();
  const tripId = params?.tripId as string;

  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR(
    tripId
      ? `${process.env.NEXT_PUBLIC_API_URL}/bookings/trip/${tripId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const booking = bookings?.[0];

  const { formattedDate, statusLabel, daysProgress } = useMemo(() => {
    if (!booking?.trip?.departureTime) {
      return { formattedDate: "", statusLabel: "Days To Go", daysProgress: 0 };
    }

    const departureDate = new Date(booking.trip.departureTime);
    const today = new Date();
    const diffDays = Math.ceil(
      (departureDate.getTime() - today.getTime()) / MS_PER_DAY
    );

    let label = "Days To Go";
    let value = 0;

    if (diffDays > 0) value = diffDays;
    else if (diffDays === 0) {
      label = "Ongoing";
      value = 100;
    } else {
      label = "Done";
      value = 100;
    }

    return {
      formattedDate: departureDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      statusLabel: label,
      daysProgress: value,
    };
  }, [booking]);

  const bookingsPercent = useMemo(() => {
    if (!booking?.trip || !bookings) return 0;

    const capacity =
      booking.trip.totalSeats ?? booking.trip.totalBookedSeats ?? 0;

    if (capacity <= 0) return 0;

    const percent = Math.round((bookings.length / capacity) * 100);
    return Math.min(100, percent);
  }, [bookings, booking]);

  if (isLoading) {
    return (
      <div className="px-10 py-8 bg-white font-inter flex items-center justify-center">
        <div className="text-gray-500">Loading booking details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 py-8 bg-white font-inter flex items-center justify-center">
        <div className="text-red-500">Failed to load booking details</div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="px-10 py-8 bg-white font-inter flex flex-col gap-8 md:flex-row justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking|Visit
          <span>{booking.trip.destination}</span>
        </h1>

        <div className="text-base flex flex-col gap-1">
          <h1>Crew Team:</h1>
          <p>
            NestorNgabonziza
            <span className="font-semibold">(Driver)</span>
          </p>
          <p>
            RamonaIngabire
            <span className="font-semibold">(Trip coordinator)</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-start text-base">
        <div className="flex gap-4 items-center">
          <IoLocationSharp size={19} />
          <p>{booking.trip.destination}</p>
        </div>
        <div className="flex gap-4 items-center">
          <FaClock />
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="flex gap-4 flex-col md:flex-row items-start text-base">
        <BookingCircularProgressbar
          progress={daysProgress}
          label={statusLabel}
        />
        <BookingCircularProgressbar
          progress={bookingsPercent}
          label="Bookings Made"
        />
      </div>
    </div>
  );
};

export default BookingHeader;
