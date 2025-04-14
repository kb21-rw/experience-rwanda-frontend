import { TripDetails } from "@/types/ImageCard"
import TripHeroCard from "./Card"

const TripHero = async ({ tripDetails }: { tripDetails: TripDetails }) => {
  return <TripHeroCard tripDetails={tripDetails} />
}

export default TripHero
