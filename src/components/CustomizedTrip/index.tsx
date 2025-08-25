import { requestTripData } from "@/data/customizedTrip";
import CustomizedTripContent from "./CustomizedTripContent";

const CustomizedTrip = () => {
  return (
    <section id={requestTripData.id} className="py-16">
      <CustomizedTripContent
        title={requestTripData.title}
        description={requestTripData.description}
        images={requestTripData.images}
      />
    </section>
  );
};

export default CustomizedTrip;
