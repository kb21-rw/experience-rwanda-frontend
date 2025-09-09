import { IoLocationSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

export const createTripDetails = (
  destination: string,
  date: string,
  totalSeats: number
) => [
  {
    icon: IoLocationSharp,
    content: destination,
  },
  {
    icon: FaCalendar,
    content: format(new Date(date), "MMMM dd, yyyy"),
  },
  {
    icon: MdAirlineSeatReclineExtra,
    content: `${totalSeats} Seats`,
  },
];

export const tripDetails = {
  header: {
    title: "Your Gateway to Adventure",
    description:
      "Discover trips that take you through Rwanda’s stunning landscapes, lively culture, and fascinating history. Explore our selection of experiences and easily book your next adventure, all in one place.",
  },
};
