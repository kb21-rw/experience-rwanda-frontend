import { Trip } from "@/types/ImageCard";
import TripHeroCard from "./Card";

const TripHero = async ({ tripDetails }: { tripDetails: Trip }) => {
  return <TripHeroCard tripDetails={tripDetails} />;
};

export default TripHero;
