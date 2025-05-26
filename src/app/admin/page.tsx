import DashboardCard from "@/components/DashboardCard";
import { Book, Users } from "lucide-react";

const AdminPage = () => {
    return (
<div className="grid grid-cols-2 gap-4 justify-center items-center">
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
        { count: 3, label: "admin", bgColor: "bg-gray-500", circleColor: "bg-gray-600" },
      ]}
    />
</div>

    );
}
export default AdminPage;