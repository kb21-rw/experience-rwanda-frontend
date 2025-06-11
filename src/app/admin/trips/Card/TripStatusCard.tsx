type StatisticsProps = {
  label: string;
  value: number;
  selected?: boolean;
  onClick?: () => void;
};

const TripStatusCard = ({ label, value, selected = false, onClick }: StatisticsProps) => (
  <div
    onClick={onClick}
    className={`border text-base px-4 py-2 rounded-lg text-center cursor-pointer transition
      ${selected ? 'border-black bg-gray-100 font-bold' : 'border-black/60 bg-white'}`}
  >
    <p className="font-semibold">{label}</p>
    <p>{value}</p>
  </div>
);

export default TripStatusCard;
