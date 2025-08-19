import Header from "@/components/Header";
import { HeaderVariant } from "@/enums/Header";
import React from "react";

const TripsPage = () => {
  return (
    <section className="  bg-site text-white min-h-screen">
      <div className="content-wrapper">
        <Header
          title="Book trip by ExperienceRW"
          description={
            "Lorem Ipsum Lorem Ipsum  Lorem Ipsum Lorem Ipsum  Lorem Ipsum Lorem Ipsum  Lorem Ipsum Lorem Ipsum"
          }
          variant={HeaderVariant.PRIMARY}
        />
      </div>
    </section>
  );
};

export default TripsPage;
