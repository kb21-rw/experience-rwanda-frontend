import { Trip } from "@/types/trip";
import TripHeroCard from "./Card";

const TripHero = async ({ tripDetails }: { tripDetails: Trip }) => {
  return <TripHeroCard tripDetails={tripDetails} />;
};

export default TripHero;
