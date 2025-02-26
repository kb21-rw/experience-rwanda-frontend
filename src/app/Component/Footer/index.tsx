"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Instagram from "@/app/assets/Instagram.svg";
import Twitter from "@/app/assets/Twitter.svg";
import Youtube from "@/app/assets/Youtube.svg";

const Footer = () => {
  const [data, setData] = useState({ logo: "", footerLinks: [], footerIcons: [] });

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const iconComponents = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };

  return (
    <footer className="absolute bottom-0 w-full flex justify-between items-center p-3 text-sm md:p-10 bg-black text-white mb-0">
      <h3 className="text-2xl font-bold md:text-base">{data.logo}</h3>

      <div className="navigation flex flex-col md:flex-row gap-3">
        {data.footerLinks.map((link) => (
          <Link href={"#"} key={link}>
            {link}
          </Link>
        ))}
      </div>

      <div className="social-icons flex flex-col md:flex-row md:gap-3">
        {data.footerIcons.map((icon) => {
          const IconComponent = iconComponents[icon.name];
          return <IconComponent key={icon.name} />;
        })}
      </div>
    </footer>
  );
};

export default Footer;
