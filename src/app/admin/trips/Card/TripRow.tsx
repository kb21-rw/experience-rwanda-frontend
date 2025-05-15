import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Trip = {
  id: string;
  title: string;
  date: string;
  location: string;
  seats: number;
  status: string;
};
export const TripRow = ({ id, title, date, location, seats, status }: Trip) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <>
      <tr className="text-sm border-t">
        <td className="py-3">{id}</td>
        <td>{title}</td>
        <td>{date}</td>
        <td>{location}</td>
        <td>{seats}</td>
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
                <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  View
                </button>
                <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                  Delete
                </button>
                <button className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
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
