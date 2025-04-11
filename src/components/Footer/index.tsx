import FooterLinks from "./FooterLinks"
import { footerData } from "../../data/siteConfig"
import FooterIcons from "./Icons"

const Footer = () => {
  const { logo } = footerData
  return (
    <footer className="footer w-full flex flex-col gap-4 md:flex-row justify-between items-center p-5 text-sm md:p-10 bg-black text-white mb-0 mt-auto">
      <h3 className="text-2xl font-bold md:text-base ">{logo}</h3>
      <FooterLinks />
      <FooterIcons />
    </footer>
  )
}

export default Footer
