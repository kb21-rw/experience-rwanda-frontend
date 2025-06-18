import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  progress: number;
  label: string;
}

const BookingCircularProgressbar = ({
  progress,
  label,
}: CircularProgressBarProps) => {
  const textInside =
    label === "Ongoing" || label === "Done"
      ? label
      : label === "Bookings Made"
      ? `${progress}%`
      : `${progress}`;

  return (
    <div className="flex flex-col items-center gap-3 text-sm">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={progress}
          text={textInside}
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
