type StatisticsProps = {
  label: string;
  value: number;
};

const StatisticsCard = ({ label, value }: StatisticsProps) => (
  <div className="border text-base px-4 py-2 rounded-lg text-center border-black">
    <p className="font-semibold">{label}</p>
    <p>{value}</p>
  </div>
);

export default StatisticsCard;
