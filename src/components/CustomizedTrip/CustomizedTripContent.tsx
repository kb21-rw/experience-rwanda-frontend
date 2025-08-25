"use client";
import Image from "next/image";

export default function CustomizedTripSection({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}) {
  return (
    <section className="bg-[#43D9AD] font-Figtree py-16 px-6 ">
      <div className="content-wrapper flex flex-col-reverse lg:flex-row items-start gap-8">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          <div className="h-full lg:row-span-2">
            <Image
              src={images[0]}
              alt="Antelopes in Rwanda"
              width={400}
              height={470}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          <div className="hidden lg:grid grid-cols-8 justify-center gap-4">
            {" "}
            <Image
              src={images[1]}
              alt="City View"
              width={200}
              height={200}
              className="rounded-xl object-cover w-full h-full lg:col-span-8"
            />
            <div className="lg:col-start-2 lg:col-end-8">
              <Image
                src="/uploads/akagera.png"
                alt="Mountain View"
                width={100}
                height={100}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="max-w-lg-">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-800 mb-6">{description}</p>
          <button className="border border-black px-6 py-2  hover:bg-black hover:text-white transition">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}
