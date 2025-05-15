export const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="border px-6 py-4 rounded-lg text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
