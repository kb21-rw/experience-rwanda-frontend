"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { footerData } from "../../../public/data/siteConfig";

const Icons = () => {
  const icons = footerData.footer.socialIcons;

  const socialIcons = useMemo(() => {
    return icons.map((icon) => {
      const { url, width, height, iconSrc,title } = icon;
      return (
        <Link href={url} key={title} aria-label={title} className="bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
          {url && (
            <Image src={iconSrc} alt={title} width={width} height={height} />
          )}
        </Link>
      );
    });
  }, [icons]);

  return <div className="social-icons flex gap-4">{socialIcons}</div>;
};

export default Icons;
