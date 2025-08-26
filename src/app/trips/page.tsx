import Header from "@/components/Header";
import TripList from "@/components/ImageCardGrid/TripList";
import { HeaderVariant } from "@/enums/Header";

async function getAllTrips() {
  const res = await fetch(
    `https://experience-rwanda-backend-production-2210.up.railway.app/api/trips/all-with-deleted`,
    { next: { tags: ["trips", "all-trips"] } }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function TripsPage() {
  const trips = await getAllTrips();
  return (
    <section className="bg-white">
      <div className="content-wrapper py-16 md:py-20">
        <Header
          title="All Trips"
          description="Browse our complete list of trips and filter to find your best match."
          variant={HeaderVariant.PRIMARY}
        />
        <TripList trips={trips} />
      </div>
    </section>
  );
}


