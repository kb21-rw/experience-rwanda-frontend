"use client"

import Image from "next/image"
import Header from "../Header"
import { HeaderVariant } from "@/enums/Header"
import defaultGalleryData from "../../data/gallery.json"

type GalleryImage = {
  id: string | number
  imageUrl: string
  alt: string
  variant?: boolean
}

type GalleryProps = {
  title?: string
  description?: string
  variant?: HeaderVariant
  images?: GalleryImage[]
}

const Gallery = ({
  title = "",
  description = "",
  variant = HeaderVariant.PRIMARY,
  images,
}: GalleryProps) => {
  const galleryImages = images || defaultGalleryData

  return (
    <section className="content-wrapper">
      <Header
        title={title}
        description={description}
        variant={variant}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 py-2 md:py-6 mx-auto">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className={`relative rounded-3xl overflow-hidden ${
              image.variant
                ? "lg:row-span-2 min-h-64 md:min-h-80 lg:min-h-96"
                : "min-h-48 md:min-h-64"
            } mb-4 md:mb-0`}>
            <Image
              src={image.imageUrl}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
