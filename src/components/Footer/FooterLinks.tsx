"use client"
import { FooterLink, SiteConfig } from "@/types/footer"
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"




const FooterLinks = () => {
    const [links, setLinks] = useState<FooterLink[]>([]);

   useEffect(() => {
       fetch("/data/siteConfig.json")
         .then((response) => response.json())
         .then((config: SiteConfig) => setLinks(config.data.attributes.footer.footerLinks));
     }, []);

     const renderedLinks = useMemo(()=> {
      return links.map((link) => (
        <Link href={"#"} key={link.id}>
          {link.name}
        </Link>))
     }, [links])
  return (
    <div className="navigation flex flex-col md:flex-row gap-3">
        {renderedLinks}
      </div>
  )
}

export default FooterLinks