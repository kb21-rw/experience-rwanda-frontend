import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatCard } from "./Card/Stat";
import { TripRow } from "./Card/TripRow";
import Search from "./Search";
import { getData } from "@/utils/request";
import { Trip } from "@/types/ImageCard";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;

const TripsPage = async () => {
  const totalTrips = 23;
  const pastTrips = 1;
  const bookedTrips = 12;

  const trips = await getData(apiUrl);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Trips</h1>
        <Search />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-10">
          <StatCard label="Total trips" value={totalTrips} />
          <StatCard label="Booked Trips" value={bookedTrips} />
          <StatCard label="Past Trips" value={pastTrips} />
        </div>

        <div>
          <Button variant="default">+ New Trip</Button>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
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
              id={(id + 1).toString()}
              seats={Number(trip.seats)}
            />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center gap-2 mt-6">
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
