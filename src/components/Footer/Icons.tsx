import Image from "next/image";
import Link from "next/link";
import { footerData } from "../../data/siteConfig";

const FooterIcons = () => {
  const icons = footerData.socialIcons;
  return <div className="social-icons flex gap-4">{icons.map(({ url, width, height, iconSrc,title }) => 
 (
      <Link href={url} key={title} aria-label={title} className="bg-slate-800 h-8 w-8 rounded-full flex items-center justify-center">
        {url && (
          <Image src={iconSrc} alt={title} width={width} height={height} />
        )}
      </Link>
    )
  
  )}</div>;
};

export default FooterIcons;
