"use client";

import React, { useMemo, useState } from "react";
import Search from "@/components/Search";
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
import { useTrips } from "@/hooks/useTrips";
import { Trip } from "@/types/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ITEM_PER_PAGE = 8;

const statusConfig = {
  available: {
    label: "Available",
    variant: "default" as const,
    color: "bg-green-100 text-green-800",
  },
  "fully-booked": {
    label: "Fully booked",
    variant: "warning" as const,
    color: "bg-yellow-100 text-yellow-800",
  },
  ongoing: {
    label: "Ongoing",
    variant: "warning" as const,
    color: "bg-blue-100 text-blue-800",
  },
  completed: {
    label: "Completed",
    variant: "success" as const,
    color: "bg-emerald-100 text-emerald-800",
  },
  canceled: {
    label: "Canceled",
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800",
  },
};

const TripList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { deleteTrip } = useDeleteTrip();
  const router = useRouter();

  const { data: trips, isLoading, error } = useTrips();
  console.log({ trips });
  const filteredTrips = trips?.filter((trip: Trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedStatus === "canceled") {
      return trip.status === "canceled" && matchesSearch;
    }
    const matchesStatus =
      selectedStatus === "all" || trip.status === selectedStatus;
    const isNotCanceled = trip.status !== "canceled";

    return matchesSearch && matchesStatus && isNotCanceled;
  });

  const statusCounts = useMemo(() => {
    return {
      all: trips?.filter((trip: Trip) => trip.status !== "canceled").length,
      available: trips?.filter((trip: Trip) => trip.status === "available")
        .length,
      "fully-booked": trips?.filter(
        (trip: Trip) => trip.status === "fully-booked"
      ).length,
      ongoing: trips?.filter((trip: Trip) => trip.status === "ongoing").length,
      completed: trips?.filter((trip: Trip) => trip.status === "completed")
        .length,
      canceled: trips?.filter((trip: Trip) => trip.status === "canceled")
        .length,
    };
  }, [trips]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <p className="animate-bounce text-2xl">Loading trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error?.message}</p>
      </div>
    );
  }

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
    <div className=" min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold">Trips</h1>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push("/trips/new")}
            className="shadow-elegant"
          >
            <Plus className="w-5 h-5" />
            Create New Trip
          </Button>
        </div>
        <div className="border border-border  overflow-hidden p-5 rounded-lg">
          <Search
            placeholder="Search by title or location"
            onSearch={setSearchTerm}
          />
          <div className="flex flex-col md:flex-row gap-5 items-center md:justify-between justify-center py-10">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Filter by Status
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus("all")}
                  className="relative"
                >
                  All Trips
                  <Badge variant="secondary" className="ml-2 bg-muted">
                    {statusCounts.all}
                  </Badge>
                </Button>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className="relative"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${config.color} mr-2`}
                    />
                    {config.label}
                    <Badge variant="secondary" className="ml-2 bg-muted">
                      {statusCounts[status as keyof typeof statusCounts]}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {paginatedTrips.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>No</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="font-semibold w-20">Action</TableHead>
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
    </div>
  );
};

export default TripList;
