import { IoLocationSharp } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

export const createTripDetails = (
  location: string,
  date: string,
  seats: number
) => [
  {
    icon: IoLocationSharp,
    content: location,
  },
  {
    icon: FaCalendar,
    content: format(new Date(date), "MMMM dd, yyyy"),
  },
  {
    icon: MdAirlineSeatReclineExtra,
    content: `${seats} Seats`,
  },
];
