"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FooterData, SiteConfig } from "@/types/footer";
import Image from "next/image";

const Footer = () => {
  const [data, setData] = useState<FooterData>({
    logo: "",
    footerLinks: [],
    footerIcons: [],
  });

  useEffect(() => {
    fetch("/data/siteConfig.json")
      .then((response) => response.json())
      .then((config: SiteConfig) => setData(config.data.attributes.footer));
  }, []);

  // const iconCards: Record<IconName, React.ComponentType> = {
  //   instagram: Instagram,
  //   twitter: Twitter,
  //   youtube: Youtube,
  // };

  return (
    <footer className="absolute bottom-0 w-full flex justify-between items-center p-3 text-sm md:p-10 bg-black text-white mb-0">
      <h3 className="text-2xl font-bold md:text-base">{data.logo}</h3>

      <div className="navigation flex flex-col md:flex-row gap-3">
        {data.footerLinks.map((link) => (
          <Link href={"#"} key={link.id}>
            {link.name}
          </Link>
        ))}
      </div>

      <div className="social-icons flex flex-col md:flex-row md:gap-3">
        {data.footerIcons.map((icon) => (<a href={icon.url} key={icon.title}>
            {icon.icon.data.attributes.url && (
              <Image
                src={icon.icon.data.attributes.url}
                alt={icon.icon.data.attributes.alternativeText || icon.title}
                width={icon.icon.data.attributes.width}
                height={icon.icon.data.attributes.height}
              />
            )}
          </a>))}
      </div>
    </footer>
  );
};

export default Footer;
