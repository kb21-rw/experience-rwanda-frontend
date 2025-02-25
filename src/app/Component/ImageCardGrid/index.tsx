import { ReactElement } from "react";
import ImageCard from "./Card";
import { Row } from "@/types/ImageCard";

const ImageCardGrid = ({
  title,
  description,
  cards,
}: Omit<Row, "id" | "__component">): ReactElement => {
  return (
    <section className="px-28">
      <div className="flex flex-col items-center py-10 text-center">
        <h1 className="font-bold text-5xl mb-5 ">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 gap-7.5">
        {cards.map((data) => (
          <ImageCard key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
};

export default ImageCardGrid;
