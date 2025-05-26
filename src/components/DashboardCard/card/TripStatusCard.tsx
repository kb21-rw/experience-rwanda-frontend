interface TripStatusBadgeProps {
  count: number;
  label: string;
  bgColor: string; 
  circleColor: string; 
}

const DashboardStatusBadge = ({ count, label, bgColor, circleColor }: TripStatusBadgeProps) => {
  return (
    <div className={`${bgColor} text-white rounded-md px-1 sm:px-3 py-4 flex flex-col items-center w-full gap-4`}>
      <span
        className={`${circleColor} text-balck text-base sm:text-lg font-semibold p-1 sm:p-3 aspect-square rounded-full flex items-center justify-center`}
      >
        {count}
      </span>
      <span className="text-xs sm:text-sm">{label}</span>
    </div>
  );
};

export default DashboardStatusBadge;
