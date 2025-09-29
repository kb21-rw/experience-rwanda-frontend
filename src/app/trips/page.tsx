"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import React from "react";
import TripsExplorer from "@/components/TripsList/TripsExplorer";
import { Trip } from "@/types/trip";
import TripsList from "@/components/TripsList";
import TripLocationBadge from "@/components/ui/LocationBagde";
import { tripLocation } from "@/data/location";

const TripsPage = async () => {
  const [activeLocation, setActiveLocation] = useState<string>(tripLocation[0]);

  const handleBadgeClick = (location: string) => {
    setActiveLocation(location);
  };
  
  const tripsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/all`, {
    cache: 'no-store' 
  });
  const trips: Trip[] = await tripsResponse.json();


const TripsPage = () => {
 
  return (
    <section className= "content-wrapper min-h-screen">
      <Header
        title={tripDetails.header.title}
        description={tripDetails.header.description}
        variant={HeaderVariant.PRIMARY}
      />

      <TripsExplorer initialTrips={trips} />
      <div className="flex justify-start md:justify-center gap-3 overflow-x-auto p-2 scrollbar-hide">
        {tripLocation.map((location) => (
          <TripLocationBadge
            key={location} 
            location={location}
            isActive={location === activeLocation}
            onClick={() => handleBadgeClick(location)}
          />
        ))}
      </div>

      <TripsList />
    </section>
  );
};

export default TripsPage;