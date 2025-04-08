import TripHeroCard from "@/components/TripHero";

export default function TripDetailsPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <TripHeroCard tripId={params.tripId} />
    </main>
  );
}
