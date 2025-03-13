"use client";
import React from "react";
import { aboutUsData } from "../../data/aboutUsData";
import Content from "./Content";



const  HeaderContent = () => {
  const { title, description } = aboutUsData;
  return (
    <section className="font-Inter w-full h-fit pb-9">
      <Content title={title} description={description} />
    </section>
  );
};

export default  HeaderContent;
