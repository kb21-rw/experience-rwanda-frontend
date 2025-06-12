import { CircularProgressbar } from "react-circular-progressbar";

interface CircularProgressBarProps {
  progress: number;
  label: string;
}
const BookingCircularProgressbar = ({
  progress,
  label,
}: CircularProgressBarProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="w-24 h-24">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
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
              fontSize: "16px",
            },
          }}
        />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default BookingCircularProgressbar;
