"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { siteConfigData } from "../../../public/data/siteConfig";

const Icons = () => {
  const icons = siteConfigData.footer.socialIcons;

  const socialIcons = useMemo(() => {
    return icons.map((icon) => {
      const { url, width, height } = icon;
      return (
        <Link href={icon.url} key={icon.title} aria-label={icon.title}>
          {url && (
            <Image src={url} alt={icon.title} width={width} height={height} />
          )}
        </Link>
      );
    });
  }, [icons]);

  return <div className="social-icons flex gap-4">{socialIcons}</div>;
};

export default Icons;
