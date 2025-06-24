"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "@/components/Search";
import TripStatusCard from "./Card/TripStatusCard";
import TripRow from "./Card/TripRow";
import { useDeleteTrip } from "@/hooks/useDeleleTrip";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import { useTrips } from "@/hooks/useTrips";
import { Trip } from "@/types/ImageCard";
import { FILTERS } from "@/utils/filters";

const ITEM_PER_PAGE = 8;

interface TripListProps {
  error: string;
  initialTrips: Trip[];
}

const TripList = ({ error: initialError, initialTrips }: TripListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { deleteTrip } = useDeleteTrip();

  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const { data: trips = initialTrips, isLoading, error } = useTrips(filter);

  const { data: allTrips = [] } = useTrips("all");
  const { data: bookedTrips = [] } = useTrips("booked");
  const { data: pastTrips = [] } = useTrips("past");
  const { data: canceledTrips = [] } = useTrips("canceled");

  const totalTripsCount = allTrips.length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <p className="animate-bounce text-2xl">Loading trips...</p>
      </div>
    );
  }

  if (error || initialError) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error?.message || initialError}</p>
      </div>
    );
  }

  const setFilter = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", newFilter);
    router.replace(`?${params.toString()}`);
  };

  const filteredTrips =
    trips?.filter((trip: Trip) => {
      const keyword = searchQuery.toLowerCase();
      return (
        trip.id.toString().toLowerCase().includes(keyword) ||
        trip.title.toLowerCase().includes(keyword) ||
        trip.destination.toLowerCase().includes(keyword)
      );
    }) || [];

  const handleDelete = async (id: string) => {
    const success = await deleteTrip(id);
    return success;
  };

  const totalPages = Math.ceil(filteredTrips.length / ITEM_PER_PAGE);
  const paginatedTrips = filteredTrips.slice(
    (currentPage - 1) * ITEM_PER_PAGE,
    currentPage * ITEM_PER_PAGE
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 xl:p-10 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Trips</h1>
          <Search onSearch={setSearchQuery} />
        </div>
        <div className="flex flex-col md:flex-row gap-5 items-center md:justify-between justify-center py-10">
          <div className="flex items-center gap-10 flex-wrap">
            {FILTERS.map((card) => (
              <TripStatusCard
                key={card.label}
                label={card.label}
                value={
                  card.value === "all"
                    ? totalTripsCount
                    : card.value === "booked"
                    ? bookedTrips.length
                    : card.value === "past"
                    ? pastTrips.length
                    : canceledTrips.length
                }
                selected={filter === card.value}
                onClick={() => setFilter(card.value)}
              />
            ))}
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
              {paginatedTrips.map((trip: Trip, index: number) => (
                <TripRow
                  key={trip.id}
                  trip={trip}
                  displayId={((currentPage - 1) * ITEM_PER_PAGE + index + 1)
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default TripList;
