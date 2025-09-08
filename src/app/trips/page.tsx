import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import React from "react";
import TripsExplorer from "@/components/TripsList/TripsExplorer";
import { Trip } from "@/types/trip";

const TripsPage = async () => {
  const tripsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, {
    cache: 'no-store' 
  });
  const trips: Trip[] = await tripsResponse.json();

  return (
    <section className="bg-site min-h-screen">
      <Header
        title={tripDetails.header.title}
        description={tripDetails.header.description}
        variant={HeaderVariant.PRIMARY}
      />

      <TripsExplorer initialTrips={trips} />
    </section>
  );
};

export default TripsPage;
