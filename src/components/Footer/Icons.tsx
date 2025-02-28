"use client"

import { FooterIcon, SiteConfig } from '@/types/footer'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



const Icons = () => {
  const [icons, setIcons] = useState<FooterIcon[]>([]);

 useEffect(() => {
        fetch("/data/siteConfig.json")
          .then((response) => response.json())
          .then((config: SiteConfig) => setIcons(config.data.attributes.footer.footerIcons));
      }, []);
  return (
    <div className="social-icons flex flex-col md:flex-row md:gap-3">
            {icons.map((icon) => (<Link href={icon.url} key={icon.title}>
                {icon.icon.data.attributes.url && (
                  <Image
                    src={icon.icon.data.attributes.url}
                    alt={icon.icon.data.attributes.alternativeText || icon.title}
                    width={icon.icon.data.attributes.width}
                    height={icon.icon.data.attributes.height}
                  />
                )}
              </Link>))}
          </div>
  )
}

export default Icons