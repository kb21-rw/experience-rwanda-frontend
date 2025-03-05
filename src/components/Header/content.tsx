import { HeaderProps } from "@/types/Header.types";
import React from "react";

const HeaderContent = ({ title, description }: HeaderProps) => {
  return (
    <div
      className="flex flex-col gap-4 content-wrapper 
    "
    >
      <h2 className="text-3xl font-bold text-center">{title}</h2>
      <p className="text-xl">{description}</p>
    </div>
  );
};

export default HeaderContent;
