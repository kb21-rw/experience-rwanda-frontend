"use client";
import React from "react";
import { aboutUsData } from "../../data/aboutUsData";
import Content from "./content";


const  HeaderContent = () => {
  const { title, description } = aboutUsData;
  return (
    <section className="font-Inter w-full h-screen">
      <Content title={title} description={description} />
    </section>
  );
};

export default  HeaderContent;
