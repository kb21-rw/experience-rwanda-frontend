type StatisticsProps = {
  label: string;
  value: number;
};

const StatisticsCard = ({ label, value }: StatisticsProps) => (
  <div className="border-2 px-4 py-2 rounded-lg text-center border-black">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default StatisticsCard;
