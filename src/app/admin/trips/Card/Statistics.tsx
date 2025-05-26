type StatisticsProps = {
  label: string;
  value: number;
};

const StatisticsCard = ({ label, value }: StatisticsProps) => (
  <div className="border-2 text-base px-4 py-2 rounded-lg text-center border-black">
    <p className="font-bold">{label}</p>
    <p className="text-start">{value}</p>
  </div>
);

export default StatisticsCard;
