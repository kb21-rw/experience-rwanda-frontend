import DashboardCard from "@/components/DashboardCard";
import { Book, Users } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-6 border border-red-500  justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold animate-in slide-in-from-left">
          Welcome to the Experience Rwanda Admin Panel
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Manage trips, bookings, and users seamlessly from one central dashboard.
          Stay organized and keep everything running smoothly.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full border-yellow-500 border">
        <DashboardCard
          title="Total Trips"
          total={80}
          icon={<Book className="text-gray-600" size={26} />}
          statuses={[
            { count: 30, label: "Upcoming", bgColor: "bg-green-500", circleColor: "bg-green-600" },
            { count: 12, label: "Canceled", bgColor: "bg-red-500", circleColor: "bg-red-600" },
            { count: 38, label: "Completed", bgColor: "bg-yellow-500", circleColor: "bg-yellow-600" },
          ]}
        />
        <DashboardCard
          title="Users"
          total={4}
          icon={<Users className="text-gray-600" size={26} />}
          statuses={[
            { count: 2, label: "Super Admin", bgColor: "bg-gray-500", circleColor: "bg-gray-600" },
            { count: 3, label: "Admin", bgColor: "bg-gray-500", circleColor: "bg-gray-600" },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminPage;
