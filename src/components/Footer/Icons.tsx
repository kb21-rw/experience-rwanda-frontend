"use client";

import { FooterIcon, SiteConfig } from "@/types/footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const Icons = () => {
  const [icons, setIcons] = useState<FooterIcon[]>([]);

  useEffect(() => {
    fetch("/data/siteConfig.json")
      .then((response) => response.json())
      .then((config: SiteConfig) =>
        setIcons(config.data.attributes.footer.footerIcons)
      );
  }, []);

  const socialIcons = useMemo(() => {
    return icons.map((icon) => {
      const { url, alternativeText, width, height } = icon.icon.data.attributes;
      return (
        <Link href={icon.url} key={icon.title}>
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
    <div className="social-icons flex flex-col md:flex-row md:gap-3">
      {socialIcons}
    </div>
  );
};

export default Icons;
