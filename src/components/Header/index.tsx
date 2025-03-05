"use client";
import React from "react";
import HeaderContent from "./content";
import { aboutUsData } from "../../data/aboutUsData";

const Header = () => {
  const { title, description } = aboutUsData;
  return (
    <section className="content-wrapper font-Inter">
      <HeaderContent title={title} description={description} />
    </section>
  );
};

export default Header;
