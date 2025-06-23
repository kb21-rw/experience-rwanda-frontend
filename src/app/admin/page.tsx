"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Admin, DashboardData } from "@/types/Admin";
import DashboardContent from "@/components/Dashboard/DasboardContent";

interface Trip {
  id: string;
  status: string;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const {
    data: trips,
    error: tripsError,
    isLoading: tripsLoading,
  } = useSWR<Trip[]>(`${process.env.NEXT_PUBLIC_API_URL}/trips`, fetcher);
  const [token, setToken] = useState<string | null>(null);

  const {
    data: admins,
    error: adminsError,
    isLoading: adminsLoading,
  } = useSWR<Admin[]>(
    [`${process.env.NEXT_PUBLIC_API_URL}/admins`, token],
    ([url, token]: [string, string]) => fetcher(url, token)
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (trips && admins) {
      const tripsStats = {
        total: trips.length,
        upcoming: trips.filter(
          (trip) => trip.status?.toLowerCase() === "upcoming"
        ).length,
        canceled: trips.filter(
          (trip) =>
            trip.status?.toLowerCase() === "canceled" ||
            trip.status?.toLowerCase() === "cancelled"
        ).length,
        completed: trips.filter(
          (trip) => trip.status?.toLowerCase() === "completed"
        ).length,
      };

      const finalDashboardData: DashboardData = {
        trips: tripsStats,
        admins: admins,
      };

      setDashboardData(finalDashboardData);
    }
  }, [trips, admins]);

  const isLoading = tripsLoading || adminsLoading;
  const error = tripsError || adminsError;
  const errorMessage = error ? "Failed to fetch dashboard data" : "";

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardContent
        data={dashboardData}
        isLoading={isLoading}
        error={errorMessage}
      />
    </div>
  );
};

export default Dashboard;
