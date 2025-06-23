"use client";

import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Trip } from "@/types/ImageCard";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DeleteAlertDialog from "@/components/AlertDialog";

interface Props {
  onDelete?: (id: string) => Promise<boolean>;
  displayId: string;
  trip: Trip;
}

const TripRow = ({ trip, displayId, onDelete }: Props) => {
  const { id, title, departureTime: date, destination } = trip;
  const { totalBookedSeats, totalSeats } = trip;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

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

  const formatedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return (
    <>
      <TableRow>
        <TableCell>{displayId}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{formatedDate}</TableCell>
        <TableCell>{destination}</TableCell>
        <TableCell>
          {totalBookedSeats} of {totalSeats}
        </TableCell>
        <TableCell>{trip.status}</TableCell>
        <TableCell>
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
              className="absolute w-28 mt-2 bg-white border rounded shadow-lg"
            >
              <Link
                href={`/admin/bookings/${id}`}
                className="block px-8 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              >
                Bookings
              </Link>

              <DeleteAlertDialog
                onDelete={async () => {
                  const success = await onDelete?.(id);
                  return success || false;
                }}
                title="Delete Trip?"
                description="Are you sure you want to this trip ? This action can not  undone."
              />

              <Link
                href={`/admin/edit-trip/${id}`}
                className="block text-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              >
                Update
              </Link>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default TripRow;
