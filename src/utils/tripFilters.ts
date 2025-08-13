import { Trip } from "@/types/ImageCard";

export const filterToStatus: Record<string, string> = {
  all: "ongoing",
  booked: "fully-booked",
  past: "completed",
  canceled: "canceled",
};

export const getStatusCounts = (trips: Trip[]) => {
  const counts = {
    all: 0,
    available: 0,
    "fully-booked": 0,
    ongoing: 0,
    completed: 0,
    canceled: 0,
  };

  trips.forEach((trip) => {
    if (trip.status !== "canceled") {
      counts.all += 1;
    }
    if (trip.status === "available") {
      counts.available += 1;
    }
    if (trip.status === "fully-booked") {
      counts["fully-booked"] += 1;
    }
    if (trip.status === "ongoing") {
      counts.ongoing += 1;
    }
    if (trip.status === "completed") {
      counts.completed += 1;
    }
    if (trip.status === "canceled") {
      counts.canceled += 1;
    }
  });

  return counts;
};

export const filterTrips = (
  trips: Trip[],
  searchTerm: string,
  selectedStatus: string
) => {
  return trips.filter((trip) => {
    const canceledTrip = trip.status === "canceled";
    const matchesStatus =
      selectedStatus === "all" || trip.status === selectedStatus;
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedStatus === "canceled") {
      return canceledTrip && matchesSearch;
    }

    return matchesSearch && matchesStatus && !canceledTrip;
  });
};
