import NewTripForm from "../../../components/TripForm";

const CreateTrip = async () => {
  return (
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | New Trip
        </h1>
      </div>

      <NewTripForm
        defaultValues={{
          title: "",
          description: "",
          destination: "",
          departureTime: new Date(),
          returnTime: new Date(),
          seats: "",
          pricingOptions: [],
        }}
      />
    </div>
  );
};

export default CreateTrip;
