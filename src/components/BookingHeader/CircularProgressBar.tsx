import { CircularProgressbar } from "react-circular-progressbar";

interface CircularProgressBarProps {
  progress: string | number;
  label: string;
}
const BookingCircularProgressbar = ({
  progress,
  label,
}: CircularProgressBarProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 text-sm border-2 border-yellow-300">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={Number(progress)}
          text={`${progress}`}
          styles={{
            path: {
              stroke: "black",
            },
            trail: {
              stroke: "#d6d6d6",
            },
            text: {
              textAnchor: "middle",
              dominantBaseline: "middle",
              fontSize: "22px",
            },
          }}
        />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default BookingCircularProgressbar;
