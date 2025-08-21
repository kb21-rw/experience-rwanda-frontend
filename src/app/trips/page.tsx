import TripList from "@/components/ImageCardGrid/TripList";

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
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Trips
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Browse our complete list of trips and filter to find your best match.
          </p>
        </div>
        <TripList trips={trips} />
      </div>
    </section>
  );
}

