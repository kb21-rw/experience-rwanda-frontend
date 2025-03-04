import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
        cards={tripData.cards}
      />
    </div>
  );
}
