import { Book, Users } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { DashboardCardData, DashboardData } from "@/types/Admin";

interface DashboardContentProps {
  data: DashboardData | null;
  isLoading: boolean;
  error: string;
}

const DashboardContent = ({
  data,
  isLoading,
  error,
}: DashboardContentProps) => {
  console.log("Dashboard data from backend:", data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">No dashboard data available</div>
      </div>
    );
  }

  const dashboardCards: DashboardCardData[] = [
    {
      title: "Total Trips",
      total: data.trips.total,
      icon: <Book className="text-gray-600" size={26} />,
      statuses: [
        {
          count: data.trips.upcoming,
          label: "Upcoming",
          bgColor: "bg-green-500",
          circleColor: "bg-green-600",
        },
        {
          count: data.trips.canceled,
          label: "Canceled",
          bgColor: "bg-red-500",
          circleColor: "bg-red-600",
        },
        {
          count: data.trips.completed,
          label: "Completed",
          bgColor: "bg-yellow-500",
          circleColor: "bg-yellow-600",
        },
      ],
    },
    {
      title: "Total Users",
      total: data.admins.length,
      icon: <Users className="text-gray-600" size={26} />,
      statuses: [
        {
          count: data.admins.filter((admin) => admin.role === "SUPER_ADMIN")
            .length,
          label: "Super Admin",
          bgColor: "bg-purple-500",
          circleColor: "bg-purple-600",
        },
        {
          count: data.admins.filter((admin) => admin.role !== "SUPER_ADMIN")
            .length,
          label: "Admin",
          bgColor: "bg-blue-500",
          circleColor: "bg-blue-600",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Experience Rwanda
        </h1>
        <p className="text-lg text-gray-600">
          Manage trips, bookings, and users seamlessly from one central
          dashboard. Stay organized and keep everything running smoothly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {dashboardCards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            total={card.total}
            icon={card.icon}
            statuses={card.statuses}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
