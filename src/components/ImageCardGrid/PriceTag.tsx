import React from "react";

const PriceTag = ({ price }: { price: number }) => {
  return (
    <div className="flex flex-col gap-1 text-base leading-[100%]">
      <div className="flex gap-2 font-semibold">
        <span>From</span> <span>{price} Rwf</span>
      </div>
      <span className="font-bold text-[#FFA500]">Per person</span>
    </div>
  );
};

export default PriceTag;
