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
          departureDate: new Date(),
          departureTime: "",
          returnDate: new Date(),
          returnTime: "",
          totalSeats: "",
          pricingOptions: [],
        }}
      />
    </div>
  );
};

export default CreateTrip;
