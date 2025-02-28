"use client";
import { useEffect, useState } from "react";
import { SiteConfig } from "@/types/footer";
import FooterLinks from "./FooterLinks";
import Icons from "./Icons";

const Footer = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch("/data/siteConfig.json")
      .then((response) => response.json())
      .then((config: SiteConfig) => setLogo(config.data.attributes.footer.logo));
  }, []);

  return (
    <footer className="absolute bottom-0 w-full flex justify-between items-center p-3 text-sm md:p-10 bg-black text-white mb-0">
      <h3 className="text-2xl font-bold md:text-base">{logo}</h3>
      <FooterLinks/>
      <Icons/>
    </footer>
  );
};

export default Footer;
