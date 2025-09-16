import ImageCard from "@/components/ImageCardGrid/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Trip } from "@/types/trip";
import Header from "../Header";
import { HeaderVariant } from "@/enums/Header";

const FeaturedTrips = async ({
  title = "Featured Trips",
  description = "Search trip that matches your personality. You will have the best experience ever",
}: {
  title?: string;
  description?: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`);
  const data = await res.json();

  return (
    <section>
      <div className="content-wrapper py-16 md:py-20">
        <Header
          title={title}
          description={description}
          variant={HeaderVariant.SECONDARY}
        />

        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((trip: Trip) => (
            <ImageCard
              key={trip.id}
              title={trip.title}
              coverImage={trip.coverImage}
              pricingOptions={trip.pricingOptions || []}
              departureTime={trip.departureTime}
              id={trip.id}
              totalSeats={trip.totalSeats}
              totalBookedSeats={trip.totalBookedSeats}
              currency={trip.currency}
              destination={trip.destination}
            />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/trips">
            <Button variant="default" className="px-6 py-3">
              View More Trips
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
