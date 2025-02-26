import { Row } from "@/types/ImageCard";
import data from "./../../public/data/homepage.json";
import ImageCardGrid from "./components/ImageCardGrid";
const { trips } = data.data.attributes;

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      <ImageCardGrid {...(trips as Row)} />
    </div>
  );
}
