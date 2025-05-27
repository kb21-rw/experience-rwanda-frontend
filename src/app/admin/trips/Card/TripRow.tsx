"use client";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Trip } from "@/types/ImageCard";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    const success = await onDelete?.(id);
    if (success) {
      toast.success("Trip deleted successfully");
    } else {
      toast.error("Failed to delete trip");
    }
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
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              >
                Delete
              </button>
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
