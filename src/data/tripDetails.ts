import { IoLocationSharp } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { format } from "date-fns";

export const createTripDetails = (
  destination:string,
  date: string,
  price: number,
  seats: number
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
    icon: GiPriceTag,
    content: `${price} RWF/day`,
  },
  {
    icon: MdAirlineSeatReclineExtra,
    content: `${seats} Seats`,
  },
];