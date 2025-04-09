import { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  logo: "ExperienceRw",
  footerLinks: [
    {
      sectionId: "home",
      label: "Home",
      url: "/",
    },
    {
      sectionId: "bookings",
      label: "Bookings",
      url: "/bookings",
    },
    {
      sectionId: "about",
      label: "About us",
      url: "/about",
    },
    { sectionId: "contact", label: "Contact", url: "/contact" },
  ],
  socialIcons: [
    {
      title: "linkedin",
      url: "/linkedin",
      width: 24,
      height: 24,
    },
    {
      title: "twitter",
      url: "/twitter",
      width: 24,
      height: 24,
    },
    {
      title: "youtube",
      url: "/youtube",
      width: 24,
      height: 24,
    },
  ],
};
