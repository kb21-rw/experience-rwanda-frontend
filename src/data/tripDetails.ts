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
