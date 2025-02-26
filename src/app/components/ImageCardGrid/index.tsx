import { ReactElement } from "react";
import React from "react";
import ImageCard from "./Card";
import { Row } from "@/types/ImageCard";
import { Button } from "@/components/ui/button";

const ImageCardGrid = ({
  title,
  description,
  cards,
}: Omit<Row, "id" | "__component">): ReactElement => {
  return (
    <section className="bg-gray-100 w-screen">
      <div className="content-wrapper py-[100px]">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-5xl">{title}</h1>
            <p className="text-xl">{description}</p>
          </div>
          <div className="flex gap-5 py-10 pb-5">
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
          {cards.map((data) => (
            <ImageCard key={data.id} {...data} />
          ))}
        </div>
        <div className="flex justify-center mt-[84px]">
          <Button variant="outline">See More Trips</Button>
        </div>
      </div>
    </section>
  );
};

export default ImageCardGrid;
