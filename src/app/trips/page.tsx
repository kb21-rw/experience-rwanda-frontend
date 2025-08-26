import Header from "@/components/Header";
import { tripDetails } from "@/data/tripDetails";
import { HeaderVariant } from "@/enums/Header";
import React from "react";

const TripsPage = () => {
  return (
    <section className="bg-site text-white min-h-screen">
      <div className="content-wrapper">
        <Header
          title={tripDetails.header.title}
          description={tripDetails.header.description}
          variant={HeaderVariant.PRIMARY}
        />
      </div>
    </section>
  );
};

export default TripsPage;
