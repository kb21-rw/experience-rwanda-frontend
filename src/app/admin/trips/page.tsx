"use client";

import React, { useState } from "react";
import TripStatusCard from "./Card/Statistics";
import TripRow from "./Card/TripRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import { useDeleteTrip } from "@/hooks/useDeleleTrip";
import { useTrips } from "@/hooks/useTrips";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

const TripsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 8;
  const { deleteTrip } = useDeleteTrip();
  const { trips, setTrips, loading, error } = useTrips();

  const filteredTrips = trips.filter((trip) => {
    const keyword = searchQuery.toLowerCase();
    return (
      trip.id.toLowerCase().includes(keyword) ||
      trip.title.toLowerCase().includes(keyword) ||
      trip.destination.toLowerCase().includes(keyword)
    );
  });

  const totalTrips = trips.length;
  const pastTrips = 5;
  const bookedTrips = trips.filter((trip) => trip.totalBookedSeats > 0).length;
  const canceledTrips = 0;

  const handleDelete = async (id: string) => {
    const success = await deleteTrip(id);
    if (success) {
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    }
    return success;
  };

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <p className="animate-bounce text-2xl">Loading trips...</p>
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error}</p>
      </div>
    );
  }
  return (
    <div className="p-6 xl:p-10 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Trips</h1>
          <Search onSearch={setSearchQuery} placeholder="Search Trip" />
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-center md:justify-between justify-center py-10">
          <div className="flex items-center gap-10 flex-wrap">
            <TripStatusCard label="Total trips" value={totalTrips} />
            <TripStatusCard label="Booked Trips" value={bookedTrips} />
            <TripStatusCard label="Past Trips" value={pastTrips} />
            <TripStatusCard label="Canceled Trips" value={canceledTrips} />
          </div>
          <Link href="/admin/new-trip" className="flex items-center gap-2">
            <IoIosAddCircle className="w-8 h-8" />
            <p className="font-inter text-lg font-semibold hover:none">
              New Trip
            </p>
          </Link>
        </div>
        {paginatedTrips.length > 0 ? (
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
              {paginatedTrips.map((trip, index) => (
                <TripRow
                  key={trip.id}
                  trip={trip}
                  displayId={((currentPage - 1) * tripsPerPage + index + 1)
                    .toString()
                    .padStart(3, "0")}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-gray-500 text-xl py-10">
            No trips found.
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
      </div>
    </div>
  );
};

export default TripsPage;
