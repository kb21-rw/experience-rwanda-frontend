"use client"
import { FooterLink, SiteConfig } from "@/types/footer"
import Link from "next/link";
import { useEffect, useState } from "react"




const FooterLinks = () => {
    const [links, setLinks] = useState<FooterLink[]>([]);

   useEffect(() => {
       fetch("/data/siteConfig.json")
         .then((response) => response.json())
         .then((config: SiteConfig) => setLinks(config.data.attributes.footer.footerLinks));
     }, []);
  return (
    <div className="navigation flex flex-col md:flex-row gap-3">
        {links.map((link) => (
          <Link href={"#"} key={link.id}>
            {link.name}
          </Link>
        ))}
      </div>
  )
}

export default FooterLinks