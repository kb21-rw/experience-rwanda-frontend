"use client";

import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import { useState } from "react";
import TripsList from "@/components/TripsList";
import TripLocationBadge from "@/components/ui/LocationBagde";
import { tripLocation } from "@/data/location";

const TripsPage = () => {
  const [activeLocation, setActiveLocation] = useState<string>(tripLocation[0]);

  return (
    <section className="bg-site min-h-screen">
      <Header
        title={tripDetails.header.title}
        description={tripDetails.header.description}
        variant={HeaderVariant.PRIMARY}
      />

      <div className="flex justify-start md:justify-center gap-3 overflow-x-auto p-2 scrollbar-hide">
        {tripLocation.map((location) => (
          <TripLocationBadge
            key={location}
            location={location}
            isActive={location === activeLocation}
            onClick={() => setActiveLocation(location)}
          />
        ))}
      </div>

      <TripsList />
    </section>
  );
};

export default TripsPage;
