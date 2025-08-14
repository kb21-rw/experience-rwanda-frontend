"use client";
import Image from "next/image";

export default function CustomizedTripSection() {
  return (
    <section className="bg-green-700 bg-opacity-60 py-10 px-6">
      <div className="content-wrapper flex flex-col md:flex-row items-center gap-8">
        
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr] gap-4 items-center">
          <div className="row-span-2">
            <Image
              src="/uploads/elephant.webp" 
              alt="Antelopes in Rwanda"
              width={400}
              height={470}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          <div className="hiden flex flex-col justify-center gap-4"> <Image
            src="/uploads/akagera.png" 
            alt="City View"
            width={200}
            height={200}
            className="rounded-xl object-cover w-full h-full"
          />

          <Image
            src="/uploads/akagera.png" 
            alt="Mountain View"
            width={100}
            height={100}
            className="rounded-xl object-cover w-full h-full"
          />
          </div>
        </div>

        <div className="max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Request for customized trip
          </h2>
          <p className="text-gray-800 mb-6">
            Experience Rwanda like never before, contact us and tell us how your
            dream trip is. We will organize it for your preferences and browsing
            history to suggest the perfect adventures tailored to your interests.
          </p>
          <button className="border border-black px-6 py-2  hover:bg-black hover:text-white transition">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}
