import { ReactNode } from "react";
import Link from "next/link";
import DasbaordStatusBadge from "./StatusBadge";

interface DashboardCardProps {
  title: string;
  total: number;
  icon: ReactNode;
  statuses: {
    count: number;
    label: string;
    bgColor: string;
    circleColor: string;
  }[];
}

const DashboardCard = ({
  title,
  total,
  icon,
  statuses,
}: DashboardCardProps) => {
  return (
    <Link href="/admin/dashboard">
      <div className="bg-white h-full rounded-xl shadow-md px-4 py-8 gap-8 md:w-[380px]  max-w-md- border-2 border-gray-200 cursor-pointer my-4 ">
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h3 className="text-base md:text-lg font-medium text-gray-600">
              {title}
            </h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              {total}
            </p>
          </div>
          <div className="bg-gray-200 p-3 sm:p-4 rounded-full">{icon}</div>
        </div>

        <div className="flex justify-between items-center gap-2">
          {statuses.map((status, index) => (
            <DasbaordStatusBadge
              key={index}
              count={status.count}
              label={status.label}
              bgColor={status.bgColor}
              circleColor={status.circleColor}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
