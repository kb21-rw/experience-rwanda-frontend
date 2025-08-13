"use client";
import Link from "next/link";
import React from "react";
import { Links } from "@/types/footer";
import Image from "next/image";

interface FooterProps {
  title: string;
  links: Links[];
}
const FooterLinks = ({ title, links }: FooterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="navigation flex flex-col gap-3">
        {links.map((link, index) => (
          <Link
            key={link.sectionId + index}
            rel="noopener noreferrer"
            href={link.url}
            target="_blank"
            className="hover:text-site-secondary hover:underline hover:transition-colors duration-300 ease-in-out hover:underline-offset-4 flex items-center gap-2"
          >
            {link.logo && (
              <Image
                src={link.logo}
                alt={link.label}
                width={20}
                height={20}
                className="text-site-secondary"
              />
            )}
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
