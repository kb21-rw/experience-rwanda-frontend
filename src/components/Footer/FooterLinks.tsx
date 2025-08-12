"use client";
import Link from "next/link";
import React from "react";
import { Links } from "@/types/footer";

interface FooterProps {
  title: string;
  links: Links[];
}
const FooterLinks = ({ title, links }: FooterProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="navigation flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={link.sectionId + index}>
            <Link
              rel="noopener noreferrer"
              href={link.url}
              target="_blank"
              className="hover:text-site-secondary hover:underline hover:transition-colors duration-300 ease-in-out hover:underline-offset-4"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
