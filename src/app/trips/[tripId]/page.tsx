import TripHeroCard from "@/components/TripHero";

export default function TripDetailsPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <main className="min-h-screen">
      <TripHeroCard tripId={params.tripId} />
    </main>
  );
}