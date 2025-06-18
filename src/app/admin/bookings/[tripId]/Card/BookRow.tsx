"use client";

import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Booking } from "@/types/Booking";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { IoIosAlert } from "react-icons/io";
import { toast } from "react-toastify";

interface Props {
  onDelete?: (id: string) => Promise<boolean>;
  booking: Booking;
  displayId: string;
}

const BookRow = ({ onDelete, booking, displayId }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
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
              <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
                View
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex justify-center items-center text-center">
                      <IoIosAlert fill="red" className="w-12 h-12" />
                    </div>

                    <AlertDialogTitle className="text-bold text-center text-2xl mb-6">
                      Do you want to delete this booking?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-black mb-6">
                      By deleting this booking, all infromation related to this booking will be also deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-8">
                    <AlertDialogAction
                      onClick={async () => {
                        const success = await onDelete?.(booking.id);
                        if (!success) {
                          toast.error("Failed to delete booking");
                          return;
                        }
                        toast.success("Booking deleted successfully");
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


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
    </>
  );
};
export default BookRow;
