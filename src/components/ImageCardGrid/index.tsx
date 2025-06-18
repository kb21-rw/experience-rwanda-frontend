import { Row } from "@/types/ImageCard";
import TripList from "./TripList";

const ImageCardGrid = async ({
  id,
  title,
  description,
}: Omit<Row, "cards">) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
    next: { tags: ["trips"] },
  });
  const trips = await data.json();

  return (
    <section id={id} className="bg-gray-100">
      <div className="content-wrapper md:py-25 py-12.5 font-inter">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex flex-col gap-6 font-inter xl:w-1/2">
            <h1 className="font-bold text-2xl md:text-5xl">{title}</h1>
            <p className="md:text-xl text-base font-normal">{description}</p>
          </div>
        </div>
        <TripList trips={trips} />
      </div>
    </section>
  );
};

export default ImageCardGrid;
