import { ReactElement } from "react";
import Image from "next/image";
import IconContent from "../ui/IconContent";
import { createTripDetails } from "@/data/tripDetails";
import Tag from "./Tag";
import { UsersIcon } from "lucide-react";
import PriceTag from "./PriceTag";
import Link from "next/link";
import { PricingOption } from "@/types/trip";

type ImageCardProps = {
  title: string;
  coverImage: string;
  pricingOptions: PricingOption[];
  departureTime: string;
  id: string;
  totalSeats: number;
  totalBookedSeats: number;
  currency: string;
  destination: string;
};

const ImageCard = (tripData: ImageCardProps): ReactElement => {
  const {
    title: trip,
    coverImage: url,
    pricingOptions,
    departureTime: date,
    id: tripId,
    totalSeats,
    totalBookedSeats,
    currency,
    destination,
  } = tripData;
  const details = createTripDetails(destination, date, totalSeats);

  const priceAmount =
    Array.isArray(pricingOptions) && pricingOptions.length > 0
      ? pricingOptions.reduce(
          (min, p) => (p.amount < min ? p.amount : min),
          pricingOptions[0].amount
        )
      : 0;
  return (
    <div className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-64">
        <Tag
          variant="default"
          text="Wildlife adventuress"
          className="absolute top-4 left-4"
        />
        <Tag
          variant="default"
          text={`${totalSeats - totalBookedSeats} left`}
          icon={<UsersIcon size={16} />}
          className="absolute bottom-4 right-4"
        />
        <Image className="object-cover" src={url} alt={trip} fill priority />
      </div>
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-black">{trip}</h2>

        <div className="gap-4 grid grid-cols-1">
          {details.map((detail, index) => (
            <IconContent
              key={index}
              icon={detail.icon}
              content={detail.content}
            />
          ))}
        </div>
      </div>
      <hr className="h-0.5" />
      <div className="flex gap-3 justify-between items-center p-6">
        <PriceTag price={priceAmount} currency={currency} />
        <Link
          href={`/trips/${tripId}`}
          className="bg-green-700 px-6 py-2 rounded-full text-black leading-[100%] font-semibold"
        >
          View more
        </Link>
      </div>
    </div>
  );
};

export default ImageCard;
