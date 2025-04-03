import HeroContent from "@/components/HeroContent"
import heroData from "./../data/heroData.json"
import tripData from "./../data/tripData.json"
import ImageCardGrid from "../components/ImageCardGrid"
import Toastify from "@/components/Toastify"
import { Suspense } from "react"
import { aboutUsData } from "@/data/about"
import Header from "@/components/Header"
import Gallery from "@/components/Gallery"
import { HeaderVariant } from "@/enums/Header"
import { galleryData } from "../data/gallery.json"
export default function Home() {
  return (
    <Suspense fallback={null}>
      <Toastify />
      <HeroContent
        imageUrl={heroData.imageUrl}
        content={{ title: heroData.title, description: heroData.description }}
      />
      <Header
        title={aboutUsData.title}
        description={aboutUsData.description}
        variant={aboutUsData.variant}
      />
      <ImageCardGrid
        title={tripData.title}
        description={tripData.description}
      />
      <Gallery
        title="Gallery"
        description="Discover Rwanda's magnificent wildlife through our stunning photo collection"
        variant={HeaderVariant.PRIMARY}
        images={galleryData}
      />
    </Suspense>
  )
}
