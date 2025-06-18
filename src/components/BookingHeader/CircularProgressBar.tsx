import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  progress: number | string;
  label: string;
}

const BookingCircularProgressbar = ({
  progress,
  label,
}: CircularProgressBarProps) => {
  const textInsideCircle =
    label === "Ongoing" || label === "Done"
      ? label
      : typeof progress === "number"
      ? String(progress)
      : progress;

  return (
    <div className="flex flex-col items-center gap-3 text-sm">
      <div className="w-16 h-16 flex items-center justify-center">
        <CircularProgressbar
          value={typeof progress === "number" ? progress : 0}
          text={textInsideCircle}
          styles={buildStyles({
            pathColor: "black",
            trailColor: "#d6d6d6",
            textColor: "black",
            textSize: "22px",
          })}
        />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default BookingCircularProgressbar;
