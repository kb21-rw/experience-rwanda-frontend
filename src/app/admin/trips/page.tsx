import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./Search";
import { getData } from "@/utils/request";
import { Trip } from "@/types/ImageCard";
import TripStatusCard from "./Card/Statistics";
import TripRow from "./Card/TripRow";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;

const TripsPage = async () => {
  const trips = await getData(apiUrl);

  const totalTrips = trips.length;
  const pastTrips = 5;
  const bookedTrips = trips.filter((trip: Trip) => trip.seatsBooked > 0).length;
  const canceledTrips = 0;

  return (
    <div className="p-6 xl:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trips</h1>
        <Search />
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between py-10">
        <div className="flex items-center gap-10">
          <TripStatusCard label="Total trips" value={totalTrips} />
          <TripStatusCard label="Booked Trips" value={bookedTrips} />
          <TripStatusCard label="Past Trips" value={pastTrips} />
          <TripStatusCard label="Canceled Trips" value={canceledTrips} />
        </div>

        <div>
          <Button variant="default">+ New Trip</Button>
        </div>
      </div>
      <div className="md:w-full overflow-x-auto mt-5 w-fit">
        <table className="w-full text-left font-inter">
          <thead>
            <tr className="text-base">
              <th className="py-2">No</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip: Trip, id: number) => (
              <TripRow
                key={id}
                {...trip}
                id={(id + 1).toString().padStart(3, "0")}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="fixed bottom-0 left-64 right-0 bg-white py-4 flex items-center justify-center gap-2 border-t">
        <button className="p-2 rounded-full bg-gray-200">
          <ChevronLeft size={16} />
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full text-sm font-medium ${
              page === 1 ? "bg-black text-white" : "text-black"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 rounded-full bg-gray-200">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TripsPage;
