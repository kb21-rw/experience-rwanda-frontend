"use client";
import NewTripForm from "../../../components/TripForm";

const CreateTrip = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-blue/5 to-travel-green/5 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
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
            totalSeats: "",
            pricingOptions: [],
          }}
        />
      </div>
    </div>
  );
};

export default CreateTrip;
