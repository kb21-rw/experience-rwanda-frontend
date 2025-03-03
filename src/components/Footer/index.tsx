"use client";
import FooterLinks from "./FooterLinks";
import Icons from "./Icons";
import { siteConfigData } from "../../../public/data/siteConfig";

const Footer = () => {
const logo = siteConfigData.data.attributes.footer.logo
  return (
    <footer className="absolute bottom-0 w-full flex flex-col gap-4 md:flex-row justify-between items-center p-5 text-sm md:p-10 bg-black text-white mb-0">
      <h3 className="text-2xl font-bold md:text-base">{logo}</h3>
      <FooterLinks/>
      <Icons/>
    </footer>
  );
};

export default Footer;
