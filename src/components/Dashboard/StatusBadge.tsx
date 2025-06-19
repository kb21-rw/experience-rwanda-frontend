interface StatusBadgeProps {
  count: number;
  label: string;
  bgColor: string;
  circleColor: string;
  className?: string;
}

const StatusBadge = ({
  count,
  label,
  bgColor,
  circleColor,
  className,
}: StatusBadgeProps) => {
  return (
    <div
      className={`${bgColor} ${className} text-white rounded-md px-3 py-4 flex flex-col items-center text-nowrap gap-4`}
    >
      <p
        className={`${circleColor} text-black text-lg font-semibold p-3 aspect-square rounded-full flex items-center justify-center`}
      >
        {count}
      </p>
      <p className="text-xs sm:text-sm">{label}</p>
    </div>
  );
};

export default StatusBadge;
