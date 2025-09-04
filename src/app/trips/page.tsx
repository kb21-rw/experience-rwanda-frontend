import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import React from "react";
import TripsList from "@/components/TripsList";

const TripsPage = () => {
  return (
    <section className="bg-site min-h-screen">
      <Header
        title={tripDetails.header.title}
        description={tripDetails.header.description}
        variant={HeaderVariant.PRIMARY}
      />

      <TripsList />
    </section>
  );
};

export default TripsPage;
