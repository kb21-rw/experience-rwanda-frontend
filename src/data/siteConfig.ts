import { FooterData } from "@/types/footer";

export const footerData :FooterData = {
  logo: "ExperienceRw",
  footerLinks: [
    {
      sectionId: "home",
      label: "Home",
    },
    {
      sectionId: "bookings",
      label: "Bookings",
    },
    {
      sectionId: "about",
      label: "About us",
    },
    { sectionId: "contact", 
      label: "Contact" 
    },
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
