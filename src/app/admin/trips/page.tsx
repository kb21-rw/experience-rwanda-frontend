"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Search from "./Search";
import { getData } from "@/utils/request";
import { Trip } from "@/types/ImageCard";
import TripStatusCard from "./Card/Statistics";
import TripRow from "./Card/TripRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useEffect } from "react";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const result = await getData(apiUrl);
      setTrips(result);
      setLoading(false);
    };
    fetchTrips();
  }, []);
  const totalTrips = trips.length;
  const pastTrips = 5;
  const bookedTrips = trips.filter((trip: Trip) => trip.seatsBooked > 0).length;
  const canceledTrips = 0;

  const handleDelete = (id: string) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };
  if (loading) return <p className="p-6">Loading trips...</p>;

  return (
    <div className="p-6 xl:p-10">
      <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Trips</h1>
        <Search />
      </div>
      <div className="flex flex-col md:flex-row gap-5 items-center md:justify-between justify-center py-10">
        <div className="flex items-center gap-10 flex-wrap">
          <TripStatusCard label="Total trips" value={totalTrips} />
          <TripStatusCard label="Booked Trips" value={bookedTrips} />
          <TripStatusCard label="Past Trips" value={pastTrips} />
          <TripStatusCard label="Canceled Trips" value={canceledTrips} />
        </div>

        <div>
          <Button variant="default">+ New Trip</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map((trip, index) => (
            <TripRow
              key={trip.id}
              {...trip}
              displayId={(index + 1).toString().padStart(3, "0")}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
      <div className="fixed w-fit bottom-4 left-10 xl:left-150 right-0 bg-white border-b-2 rounded-full shadow-md p-2 flex gap-2">
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
