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
          url: "#explore Trips",
        },
        {
          sectionId: "travel Trips",
          label: "Travel Trips",
          url: "#travel Trips",
        },
        { sectionId: "contact", label: "Contact Us", url: "/contact" },
        {
          sectionId: "about",
          label: "About us",
          url: "/about",
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
          url: "/newsletter",
        },
        {
          sectionId: "blog Posts",
          label: "Blog Posts",
          url: "/blog Posts",
        },
        {
          sectionId: "travel Guides",
          label: "Travel Guides",
          url: "/travel Guides",
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
          url: "#",
        },
        {
          sectionId: "instagram",
          label: "Instagram",
          url: "#",
        },
        {
          sectionId: "x",
          label: "X",
          url: "#",
        },
        { sectionId: "linkedIn", label: "LinkedIn", url: "/linkedIn" },
        { sectionId: "youTube", label: "YouTube", url: "/youTube" },
      ],
    },
  ],
  socialIcons: [
    {
      title: "linkedin",
      url: "#",
      width: 24,
      height: 24,
    },
    {
      title: "twitter",
      url: "#",
      width: 24,
      height: 24,
    },
    {
      title: "youtube",
      url: "#",
      width: 24,
      height: 24,
    },
  ],
  legalLinks: [
    {
      title: "Privacy Policy",
      url: "/privacy-policy",
    },
    {
      title: "Terms of Service",
      url: "/terms-of-service",
    },
    {
      title: "Cookie Policy",
      url: "/cookie-policy",
    },
  ],
};
