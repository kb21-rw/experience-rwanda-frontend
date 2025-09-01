import { IoLocationSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

export const createTripDetails = (
  destination: string,
  departureTime: string,
  returnTime: string,
  totalSeats: number
) => [
  {
    icon: IoLocationSharp,
    content: destination,
  },
  {
    icon: FaCalendar,
    content: format(new Date(departureTime), "MMMM dd, yyyy"),
  },
  {
    icon: FaCalendar,
    content: format(new Date(returnTime), "MMMM dd, yyyy"),
  },
  {
    icon: MdAirlineSeatReclineExtra,
    content: `${totalSeats} Seats`,
  },
];
