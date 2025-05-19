"use client";
import { Button } from "@/components/ui/Button";
import { Trip } from "@/types/ImageCard";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const TripRow = ({
  id,
  title,
  departureTime: date,
  destination,
  seatsBooked,
  seats,
  status = "ONGOING",
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
      <tr className="text-sm border-t">
        <td className="py-3">{id}</td>
        <td>{title}</td>
        <td>{formatedDate}</td>
        <td>{destination}</td>
        <td>
          {seatsBooked} of {seats}
        </td>
        <td>{status}</td>
        <td>
          <div className="relative-">
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
                <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
                  Delete
                </button>
                <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
                  Update
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
export default TripRow;
