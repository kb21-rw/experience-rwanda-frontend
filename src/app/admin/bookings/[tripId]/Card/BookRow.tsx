"use client";

import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Booking } from "@/types/Booking";

const BookRow = ({
  booking,
  displayId,
}: {
  booking: Booking;
  displayId: string;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown: () => void = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <TableRow>
        <TableCell>{displayId}</TableCell>
        <TableCell>{booking.user.fullName}</TableCell>
        <TableCell>{booking.user.phoneNumber}</TableCell>
        <TableCell>{booking.user.email}</TableCell>
        <TableCell>{booking.bookedSeats}</TableCell>
        <TableCell>{booking.totalAmount}</TableCell>

        <TableCell>
          <Button
            variant="primary"
            onClick={toggleDropdown}
            className="flex items-center gap-2"
          >
            Modify <ChevronDown size={14} />
          </Button>
          {showDropdown && (
            <div className="absolute w-28 mt-2 bg-white border rounded shadow-lg">
              <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
                View
              </button>

              <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
                Delete
              </button>

              <Link
                href={`/admin/bookings/${booking.trip.id}/${booking.id}/edit`}
                className="block text-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              >
                Edit
              </Link>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default BookRow;
