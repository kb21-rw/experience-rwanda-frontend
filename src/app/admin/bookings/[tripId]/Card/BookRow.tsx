"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import DeleteAlert from "@/components/DeleteAlert";
import { Booking } from "@/types/Booking";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
interface Props {
  onDelete?: (id: string) => Promise<boolean>;
  booking: Booking;
  displayId: string;
}

const BookRow = ({ onDelete, booking, displayId }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    <>
      <TableRow>
        <TableCell>{displayId}</TableCell>
        <TableCell>{booking.user?.fullName}</TableCell>
        <TableCell>{booking.user?.phoneNumber}</TableCell>
        <TableCell>{booking.user?.email}</TableCell>
        <TableCell>{booking.bookedSeats}</TableCell>
        <TableCell>{booking.totalAmount}</TableCell>
        <TableCell className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background border border-border shadow-lg"
            >
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/bookings/${booking.trip.id}/${booking.id}/edit`
                  )
                }
                className="flex items-center gap-2 px-2 justify-start py-2 text-sm w-full text-left hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/admin/bookings/${booking.trip.id}/${booking.id}/edit`
                  )
                }
                className="flex items-center px-2 justify-start py-2 gap-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              >
                <Edit className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DeleteAlert
                  onDelete={async () => {
                    const success = await onDelete?.(booking.id);
                    return success || false;
                  }}
                  title="Delete Booking?"
                  description={`Are you sure you want to this booking made by ${booking.user.fullName}? This action can not  undone.`}
                  errorMessage="Failed to delete booking."
                  successMessage="Booking deleted successfully."
                  setIsLoading={setIsLoading}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isLoading && <Spinner />}
    </>
  );
};

export default BookRow;
