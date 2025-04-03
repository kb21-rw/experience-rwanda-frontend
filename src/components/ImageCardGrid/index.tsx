import ImageCard from "./Card";
import { Card, Row } from "@/types/ImageCard";
import { Button } from "@/components/ui/Button";
import FilterAndSearch from "../FilterAndSearch";

const ImageCardGrid = async ({
  title,
  description,
}: Omit<Row, "id" | "cards">) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips` || "", {
    next: { revalidate: 600 },
  });
  const trips = await data.json();

  return (
    <section className="bg-gray-100">
      <FilterAndSearch />
      <div className="content-wrapper md:py-25 py-12.5 font-inter">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex flex-col gap-6 font-inter xl:w-1/2">
            <h1 className="font-bold text-2xl md:text-5xl">{title}</h1>
            <p className="md:text-xl text-base font-normal">{description}</p>
          </div>
          <div className="flex md:gap-5 gap-3 py-10 pb-5">
            <Button className="border-t-2" variant={"outline"}>
              All trips
            </Button>
            <Button className="border-t-2" variant={"outline"}>
              Nyungwe
            </Button>
            <Button className="border-t-2" variant={"outline"}>
              Akagera
            </Button>
          </div>
        </div>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
          {trips.map((data: Card) => (
            <ImageCard key={data.id} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCardGrid;
