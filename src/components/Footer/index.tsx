import FooterLinks from "./FooterLinks";
import { footerData } from "../../data/siteConfig";
import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

const Footer = () => {
  const { footerLinks } = footerData;
  return (
    <footer className=" bg-site ">
      <div className="py-6 text-sm content-wrapper text-site-secondary mb-0 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-40 py-4">
          <div className="flex flex-col gap-8">
            <Image height={60} width={60} src="/Logo.svg" alt="" />
            <SubscribeForm />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3">
            {footerLinks.map((link, index) => (
              <FooterLinks
                key={link.title + index}
                title={link.title}
                links={link.links}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center h-24 border-t border-site-secondary w-full">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Experience Rwanda. All rights
            reserved.
          </p>
          <div className="flex gap-4 justify-end">
            {["Privacy Policy", "Terms of service", "Cookie Settings"].map(
              (link, index) => (
                <Link
                  key={link + index}
                  href="#"
                  className="text-center underline hover:underline-offset-2 hover:text-site-secondary hover:transition-colors duration-300 ease-in-out"
                >
                  {link}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
