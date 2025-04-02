"use client"

import Image from "next/image"
import Header from "../Header"
import { HeaderVariant } from "@/enums/Header"
import data from "../../data/gallery.json"
const Gallery = () => {
  return (
    <section className="col-1 content-wrapper">
      <Header
        title="Gallery"
        description="Explore the natural beauty of Africa with our wildlife gallery. From majestic elephants to majestic tigers, our wildlife gallery features stunning images of wildlife in their natural habitat."
        variant={HeaderVariant.PRIMARY}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 py-2 md:py-6 mx-auto">
        {data.map((image) => (
          <div
            key={image.id}
            className={`relative rounded-3xl overflow-hidden ${
              image.variant
                ? "lg:row-span-2 h-[300px] lg:h-[700px]"
                : "h-[300px] md:h-[340px]"
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
