import { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  logo: "ExperienceRw",
  footerLinks: [
    {
      title: "Quick Links",
      links: [
        {
          sectionId: "explore Trips",
          label: "Explore Trips",
          url: "./#explore Trips",
        },
        {
          sectionId: "travel Trips",
          label: "Travel Trips",
          url: "./#travel Trips",
        },
        { sectionId: "contact", label: "Contact Us", url: "/contact" },
        {
          sectionId: "about",
          label: "About us",
          url: "./#about",
        },
        { sectionId: "fAQs", label: "FAQs", url: "/fAQs" },
      ],
    },
    {
      title: "Connect With Us",
      links: [
        {
          sectionId: "newsletter",
          label: "Newsletter",
          url: "./#newsletter",
        },
        {
          sectionId: "blog Posts",
          label: "Blog Posts",
          url: "./#blog Posts",
        },
        {
          sectionId: "travel Guides",
          label: "Travel Guides",
          url: "./#travel Guides",
        },
        { sectionId: "community", label: "Community", url: "/community" },
        { sectionId: "support", label: "Support", url: "/support" },
      ],
    },
    {
      title: "Follow us",
      links: [
        {
          sectionId: "facebook",
          label: "Facebook",
          url: "./#facebook",
        },
        {
          sectionId: "instragram",
          label: "Instragram",
          url: "./#instragram",
        },
        {
          sectionId: "x",
          label: "X",
          url: "./#x",
        },
        { sectionId: "linkedIn", label: "LinkedIn", url: "/linkedIn" },
        { sectionId: "youTube", label: "YouTube", url: "/youTube" },
      ],
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
