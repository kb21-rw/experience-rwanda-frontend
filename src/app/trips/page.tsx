import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import TripsExplorer from "@/components/TripsList/TripsExplorer";
import { Trip } from "@/types/trip";
import TripsList from "@/components/TripsList";

const TripsPage = async () => {
  const tripsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, {
    cache: 'no-store'
  });
  const trips: Trip[] = await tripsResponse.json();
  
  return (
    <>
      <Header
        title={tripDetails.header.title}
        description={tripDetails.header.description}
        variant={HeaderVariant.PRIMARY}
      />

      <TripsExplorer defaultTrips={trips} />

      <TripsList />
    </>
  );
};

export default TripsPage;