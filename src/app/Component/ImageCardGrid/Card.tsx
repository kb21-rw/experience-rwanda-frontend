import { ReactElement } from "react";
import { Card } from "@/types/ImageCard";
import Image from "next/image";

const ImageCard = ({ place, image, price, date }: Card): ReactElement => {
  const { url, alternativeText, width, height } = image.data.attributes;

  console.log("object.........................", url);
  return (
    <div>
      <Image
        src={"/uploads/akagera.png"}
        alt={alternativeText || "image"}
        width={width}
        height={height}
      />
      <div className=" ">
        <h1>{place}</h1>
        <p>{price}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ImageCard;
