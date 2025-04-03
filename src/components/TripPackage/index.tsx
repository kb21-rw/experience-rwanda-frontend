import React from "react";
import TripPackageCard from "./Card";
import { tripPackageData } from "../../data/tripPackageData";

const TripPackage = () => {
  return (
    <div className="bg-black py-25">
      <h1 className="text-2xl font-bold mb-10 text-center text-white ">
        Trip Packages
      </h1>
      <div className="flex flex-wrap gap-10 content-wrapper">
        {tripPackageData.map((item, index) => (
          <TripPackageCard
            key={index}
            title={item.title}
            icon={item.icon}
            items={item.items}
          />
        ))}
      </div>
    </div>
  );
};

export default TripPackage;
