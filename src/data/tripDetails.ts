import { IoLocationSharp } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

export const createTripDetails = (
  location: string,
  date: string,
  price: number | string,
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
    icon: GiPriceTag,
    content: `${price}$ / day`,
  },
  {
    icon: MdAirlineSeatReclineExtra,
    content: `${seats} Seats`,
  },
];
