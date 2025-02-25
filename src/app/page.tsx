import { Row } from "@/types/ImageCard";
import ImageCardGrid from "./Component/ImageCardGrid";
import data from "./../../public/data/data.json";
const { trips } = data.data.attributes;

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      {/* <TripCard image={""} location={""} price={""} date={new Date()} /> */}
      <ImageCardGrid {...(trips as Row)} />
    </div>
  );
}
