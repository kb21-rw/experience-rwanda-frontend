import { requestTripData } from "@/data/customizedTrip";
import CustomizedTripContent from "./CustomizedTripContent";

const CustomizedTrip = () => {
  return (
    <CustomizedTripContent
      title={requestTripData.title}
      description={requestTripData.description}
      images={requestTripData.images}
    />
  );
};

export default CustomizedTrip;
