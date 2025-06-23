"use client";

import { useState, useEffect } from "react";
import Search from "@/components/Search";
import TripStatusCard from "./Card/TripStatusCard";
import TripRow from "./Card/TripRow";
import { Trip } from "@/types/ImageCard";
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
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  { label: "Total trips", value: "all" },
  { label: "Booked Trips", value: "booked" },
  { label: "Past Trips", value: "past" },
  { label: "Canceled Trips", value: "canceled" },
];

const TripsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 8;
  const { deleteTrip } = useDeleteTrip();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "all";

  const setFilter = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", newFilter);
    router.replace(`?${params.toString()}`);
  };

  const getTripsUrl = (filter: string) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/trips`;
    if (filter === "booked") return `${baseUrl}?status=fully-booked`;
    if (filter === "past") return `${baseUrl}?status=completed`;
    if (filter === "canceled") return `${baseUrl}?status=canceled`;
    return baseUrl;
  };

  useEffect(() => {
    setLoading(true);
    const fetchTrips = async () => {
      try {
        const url = getTripsUrl(filter);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch trips: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setTrips(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load trips"
        );
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [filter]);

  const filteredTrips = trips.filter((trip: Trip) => {
    if (!trip) return false;
    const keyword = searchQuery.toLowerCase().trim();
    if (!keyword) return true;

    return (
      (trip.id?.toLowerCase() || "").includes(keyword) ||
      (trip.title?.toLowerCase() || "").includes(keyword) ||
      (trip.destination?.toLowerCase() || "").includes(keyword)
    );
  });

  const getTripCounts = () => {
    const counts = {
      all: trips.length,
      booked: trips.filter((trip) => trip.status === "fully-booked").length,
      past: trips.filter((trip) => trip.status === "completed").length,
      canceled: trips.filter((trip) => trip.status === "canceled").length,
    };
    return counts;
  };

  const tripCounts = getTripCounts();

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
            {FILTERS.map((card) => (
              <TripStatusCard
                key={card.label}
                label={card.label}
                value={tripCounts[card.value as keyof typeof tripCounts]}
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
