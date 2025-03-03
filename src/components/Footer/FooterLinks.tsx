"use client";

import Link from "next/link";
import { siteConfigData } from "../../../public/data/siteConfig";
import { useMemo } from "react";

const FooterLinks = () => {
  const links = siteConfigData.data.attributes.footer.footerLinks;
  const renderedLinks = useMemo(() => {
    return links.map((link) => (
      <Link href={"#"} key={link.id}>
        {link.name}
      </Link>
    ));
  }, [links]);
  return (
    <div className="navigation flex flex-col md:flex-row gap-12">
      {renderedLinks}
    </div>
  );
};

export default FooterLinks;
