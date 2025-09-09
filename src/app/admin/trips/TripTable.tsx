"use client";
import React, { useCallback, useMemo, useState } from "react";
import Search from "@/components/Search";
import TripRow from "./Card/TripRow";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useTrips } from "@/hooks/useTrips";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { STATUS_CONFIG, ITEM_PER_PAGE } from "@/utils/constants";
import TableSkeleton from "@/components/ui/skeletons/TableSkeleton";
import TripNotFound from "./Card/NotFound";
import { filterTrips, getStatusCounts } from "@/utils/tripFilters";
import { Trip } from "@/types/trip";

const TripTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { data: trips = [], isLoading, error } = useTrips();

  const filteredTrips = useMemo(
    () => filterTrips(trips, searchTerm, selectedStatus),
    [trips, searchTerm, selectedStatus]
  );

  const filteredTripPages = useMemo(
    () => Math.ceil(filteredTrips.length / ITEM_PER_PAGE),
    [filteredTrips]
  );
  const paginatedTrips = useMemo(
    () =>
      filteredTrips.slice(
        (currentPage - 1) * ITEM_PER_PAGE,
        currentPage * ITEM_PER_PAGE
      ),
    [filteredTrips, currentPage]
  );

  const statusCounts = useMemo(() => getStatusCounts(trips), [trips]);

  const changePage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= filteredTripPages) {
        setCurrentPage(page);
      }
    },
    [filteredTripPages]
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-center h-screen text-red-600">
        <p className="text-xl">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen border border-border overflow-hidden p-5 rounded-lg">
      <Search
        placeholder="Search by title or location"
        onSearch={setSearchTerm}
        className="w-1/3"
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
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className="relative"
              >
                <div className={`w-2 h-2 rounded-full ${config.color} mr-2`} />
                {config.label}
                <Badge variant="secondary" className="ml-2 bg-muted">
                  {statusCounts[status as keyof typeof statusCounts]}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>
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
          {paginatedTrips.length > 0 ? (
            paginatedTrips.map((trip: Trip, index: number) => (
              <TripRow
                key={trip.id}
                trip={trip}
                displayId={((currentPage - 1) * ITEM_PER_PAGE + index + 1)
                  .toString()
                  .padStart(3, "0")}
              />
            ))
          ) : (
            <TripNotFound title="No Trips" description="No trips found." />
          )}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={filteredTripPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default TripTable;
