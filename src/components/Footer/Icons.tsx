"use client";

// import { FooterIcon, SiteConfig } from "@/types/footer";
import Image from "next/image";
import Link from "next/link";
import React, {useMemo } from "react";
import { siteConfigData } from "../../../public/data/siteConfig";

const Icons = () => {
const icons = siteConfigData.data.footer.footerIcons

  const socialIcons = useMemo(() => {
    return icons.map((icon) => {
      const { url, alternativeText, width, height } = icon.icon.data.attributes;
      return (
        <Link href={icon.url} key={icon.title} aria-label={icon.title}>
          {url && (
            <Image
              src={url}
              alt={alternativeText || icon.title}
              width={width}
              height={height}
            />
          )}
        </Link>
      );
    });
  }, [icons]);

  return (
    <div className="social-icons flex gap-4">
      {socialIcons}
    </div>
  );
};

export default Icons;
