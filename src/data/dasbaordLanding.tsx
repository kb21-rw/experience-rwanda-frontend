import { Book, Users } from "lucide-react";
import { ReactNode } from "react";

export interface StatusBadge {
  count: number;
  label: string;
  bgColor: string;
  circleColor: string;
}

export interface DashboardCardData {
  title: string;
  total: number;
  icon: () => ReactNode;
  statuses: StatusBadge[];
}

export const dashboardCards: DashboardCardData[] = [
  {
    title: "Total Trips",
    total: 80,
    icon: () => <Book className="text-gray-600" size={26} />,
    statuses: [
      { count: 30, label: "Upcoming", bgColor: "bg-green-500", circleColor: "bg-green-600" },
      { count: 12, label: "Canceled", bgColor: "bg-red-500", circleColor: "bg-red-600" },
      { count: 38, label: "Completed", bgColor: "bg-yellow-500", circleColor: "bg-yellow-600" },
    ],
  },
  {
    title: "Users",
    total: 5,
    icon: () => <Users className="text-gray-600" size={26} />,
    statuses: [
      { count: 2, label: "Super Admin", bgColor: "bg-gray-500", circleColor: "bg-gray-600" },
      { count: 3, label: "Admin", bgColor: "bg-gray-500", circleColor: "bg-gray-600" },
    ],
  },
];
