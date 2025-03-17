import Link from "next/link";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { footerData } from "../../data/siteConfig";
import { IconType } from "react-icons";
import { IconName, FooterIcon } from "../../types/footer";
const FooterIcons = () => {
  const icons: Record<IconName, IconType> = {
    linkedin: FaLinkedin,
    twitter: FaXTwitter,
    youtube: FaYoutube,
  };

  return (
    <div className="flex justify-center gap-6">
      {footerData.socialIcons.map((icon: FooterIcon) => {
        const Icon = icons[icon.title];

        return (
          <Link key={icon.title} href={icon.url} target="_blank">
            <Icon size={20} />
          </Link>
        );
      })}
    </div>
  );
};

export default FooterIcons;
