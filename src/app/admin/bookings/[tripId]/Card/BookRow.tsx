"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "@/components/DeleteAlert";
import { Booking } from "@/types/Booking";

interface Props {
  onDelete?: (id: string) => Promise<boolean>;
  booking: Booking;
  displayId: string;
}

const BookRow = ({ onDelete, booking, displayId }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isClickOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target);

      const isInsideAlertDialog = (target as HTMLElement).closest(
        "[role='alertdialog']"
      );

      if (isClickOutsideDropdown && !isInsideAlertDialog) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <TableRow>
      <TableCell>{displayId}</TableCell>
      <TableCell>{booking.user?.fullName}</TableCell>
      <TableCell>{booking.user?.phoneNumber}</TableCell>
      <TableCell>{booking.user?.email}</TableCell>
      <TableCell>{booking.bookedSeats}</TableCell>
      <TableCell>{booking.totalAmount}</TableCell>
      <TableCell className="relative">
        <Button
          variant="primary"
          onClick={toggleDropdown}
          className="flex items-center gap-2"
        >
          Modify <ChevronDown size={14} />
        </Button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-28 mt-2 bg-white border rounded shadow-lg"
          >
            <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
              View
            </button>

            <DeleteAlert
              onDelete={async () => {
                const success = await onDelete?.(booking.id);
                return success || false;
              }}
              title="Delete Booking?"
              description={`Are you sure you want to this booking made by ${booking.user.fullName}? This action can not  undone.`}
              errorMessage="Failed to delete booking."
              successMessage="Booking deleted successfully."
            />

            <Link
              href={`/admin/bookings/${booking.id}`}
              className="block text-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
            >
              Update
            </Link>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
