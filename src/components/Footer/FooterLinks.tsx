"use client";
import Link from "next/link";
import { footerData } from "../../data/siteConfig";
import React from "react";

const FooterLinks = () => {
  const { footerLinks } = footerData;
  const handleScroll = (event: React.MouseEvent, targetId: string) => {
    event.preventDefault();
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="navigation flex gap-6 md:gap-12">
      {footerLinks.map((link) => (
        <Link
          href={link.url}
          key={link.sectionId}
          onClick={(e) => {
            if (link.url === "/") {
              handleScroll(e, link.sectionId);
            }
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinks;
