"use client";
import Link from "next/link";
import { footerData } from "../../data/siteConfig";

const FooterLinks = () => {
  const links = footerData.links;

  return (
    <div className="navigation flex gap-6 md:gap-12">
      {links.map((link) => (
        <Link href={"#"} key={link.id}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterLinks;
