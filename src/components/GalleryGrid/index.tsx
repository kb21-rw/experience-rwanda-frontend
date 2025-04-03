"use client"

import Image from "next/image"
import defaultGalleryData from "../../data/gallery.json"

type GalleryImage = {
  id: string | number
  imageUrl: string
  alt: string
  variant?: boolean
}

type GalleryProps = {
  title?: string
  images?: GalleryImage[]
}

const GalleryGrid = ({ images, title }: GalleryProps) => {
  const galleryImages = images || defaultGalleryData

  return (
    <section className="content-wrapper">
      <h1 className="font-bold text-2xl md:text-4xl text-center p-4 md:p-10">
        {title}{" "}
      </h1>

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

export default GalleryGrid
