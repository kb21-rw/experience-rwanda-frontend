import TripPackageCard from "./Card";
import { tripPackageData } from "../../data/tripPackageData";

type TripPackageProps = {
  title: string;
};

const TripPackage = ({ title }: TripPackageProps) => {
  return (
    <div className="bg-black md:py-30 py-12.5">
      <h1 className="text-4xl font-bold md:mb-20 mb-10 text-center text-white">
        {title}
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
