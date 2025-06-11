import DashboardCard from "@/components/DashboardCard";
import { Book, Users } from "lucide-react";
import dashboard from "./../../data/dashbaord.json";

const AdminPage = () => {
  return (
    <div className="px-4 py-6 h-screen w-full flex flex-col justify-center items-center mt-16 lg:mt-0">
      <div className="flex flex-col items-center gap-4 text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold animate-in slide-in-from-left">
          {dashboard.title}
        </h1>
        <p className="text-gray-600 text-base md:text-xl mt-2 md:w-2/3 w-full mx-auto">
          {dashboard.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-6 w-full items-stretch">
        <DashboardCard
          total={80}
          icon={<Book className="text-gray-600" size={26} />}
          statuses={[
            {
              count: 30,
              label: "Upcoming",
              bgColor: "bg-green-500",
              circleColor: "bg-green-600",
            },
            {
              count: 12,
              label: "Canceled",
              bgColor: "bg-red-500",
              circleColor: "bg-red-600",
            },
            {
              count: 38,
              label: "Completed",
              bgColor: "bg-yellow-500",
              circleColor: "bg-yellow-600",
            },
          ]}
          title={"Total Trips"}
        />
        <DashboardCard
          title="Users"
          total={4}
          icon={<Users className="text-gray-600" size={26} />}
          statuses={[
            {
              count: 2,
              label: "Super Admin",
              bgColor: "bg-gray-500",
              circleColor: "bg-gray-600",
            },
            {
              count: 3,
              label: "Admin",
              bgColor: "bg-gray-500",
              circleColor: "bg-gray-600",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminPage;
