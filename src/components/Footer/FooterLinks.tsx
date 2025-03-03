"use client";
import Link from "next/link";
import { footerData } from "../../../public/data/siteConfig";
import { useMemo } from "react";

const FooterLinks = () => {
  const links = footerData.footer.links;
  const renderedLinks = useMemo(() => {
    return links.map((link) => (
      <Link href={"#"} key={link.id}>
        {link.name}
      </Link>
    ));
  }, [links]);
  return (
    <div className="navigation flex gap-6 md:gap-12">
      {renderedLinks}
    </div>
  );
};

export default FooterLinks;
