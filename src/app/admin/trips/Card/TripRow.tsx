"use client";
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
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Trip } from "@/types/ImageCard";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoIosAlert } from "react-icons/io";

const TripRow = ({
  id,
  displayId,
  title,
  departureTime: date,
  destination,
  seatsBooked,
  seats,
  status = "ONGOING",
  onDelete,
}: Trip) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

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
          {seatsBooked} of {seats}
        </TableCell>
        <TableCell>{status}</TableCell>
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="block px-8 py-2 text-sm w-full text-left hover:bg-gray-100">
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex justify-center items-center text-center">
                      <IoIosAlert className="w-12 h-12" />
                    </div>

                    <AlertDialogTitle className="text-bold text-center text-2xl mb-6">
                      Do you want to delete this Trip?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-lg text-black mb-6">
                      By deleting this trip, all books made on this trip will be
                      disactivated means some refund will be made on the
                      clients.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-8">
                    <AlertDialogAction
                      onClick={async () => {
                        const success = await onDelete?.(id);
                        if (!success) {
                          toast.error("Failed to delete trip");
                          return;
                        }
                        toast.success("Trip deleted successfully");
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
                Update
              </button>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default TripRow;
