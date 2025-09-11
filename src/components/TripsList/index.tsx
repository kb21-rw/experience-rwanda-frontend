import FilterSidebar from "./FilterSider";
import { Trip } from "@/types/trip";
import Trips from "./Trips";
import ImageCard from "../ImageCardGrid/Card";

const TripsList = async () => {
  const trips = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`);
  const data = await trips.json();
  
  return (
    <section className="min-h-screen bg-site">
      <Trips tripsLength={data.length} />
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 lg:p-16 p-6">
        <div className="hidden lg:block lg:col-span-2">
          <FilterSidebar tripsCount={data.length} />
        </div>
        <div className="lg:col-span-7 font-plusjakarta">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((trip: Trip) => (
              <ImageCard
                key={trip.id}
                id={trip.id}
                title={trip.title}
                coverImage={trip.coverImage}
                pricingOptions={trip.pricingOptions || []}
                departureTime={trip.departureTime.toLocaleString()}
                totalSeats={trip.totalSeats}
                totalBookedSeats={trip.totalBookedSeats || 0}
                currency={trip.currency}
                destination={trip.destination}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripsList;
