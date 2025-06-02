import NewTripForm from "./NewTripForm";

const CreateTrip = () => {
  return (
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | New Trip
        </h1>
      </div>

      <NewTripForm />
    </div>
  );
};

export default CreateTrip;
