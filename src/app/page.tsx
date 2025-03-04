import tripData from "./../data/tripData.json";
import ImageCardGrid from "../components/ImageCardGrid";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      <ImageCardGrid
        title={tripData.trips.title}
        description={tripData.trips.description}
        cards={tripData.trips.cards}
      />
    </div>
  );
}
