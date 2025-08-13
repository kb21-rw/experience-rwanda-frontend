import { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  logo: "ExperienceRw",
  footerLinks: [
    {
      title: "Quick Links",
      links: [
        {
          sectionId: "explore Trips",
          logo: null,
          label: "Explore Trips",
          url: "#explore-trips",
        },
        {
          sectionId: "travel Trips",
          logo: null,
          label: "Travel Trips",
          url: "#travel-trips",
        },
        {
          sectionId: "contact",
          logo: null,
          label: "Contact Us",
          url: "/contact",
        },
        {
          sectionId: "about",
          logo: null,
          label: "About us",
          url: "/about",
        },
        { sectionId: "fAQs", logo: null, label: "FAQs", url: "/faqs" },
      ],
    },
    {
      title: "Connect With Us",
      links: [
        {
          sectionId: "newsletter",
          logo: null,
          label: "Newsletter",
          url: "/newsletter",
        },
        {
          sectionId: "blog Posts",
          logo: null,
          label: "Blog Posts",
          url: "/blog-posts",
        },
        {
          sectionId: "travel Guides",
          logo: null,
          label: "Travel Guides",
          url: "/travel-guides",
        },
        {
          sectionId: "community",
          logo: null,
          label: "Community",
          url: "/community",
        },
        {
          sectionId: "support",
          logo: null,
          label: "Support",
          url: "/support",
        },
      ],
    },
    {
      title: "Follow us",
      links: [
        {
          sectionId: "facebook",
          logo: "/uploads/facebook.svg",
          label: "Facebook",
          url: "#",
        },
        {
          sectionId: "instagram",
          logo: "/uploads/instagram.svg",
          label: "Instagram",
          url: "#",
        },
        {
          sectionId: "x",
          logo: "/uploads/twitter.svg",
          label: "X",
          url: "#",
        },
        {
          sectionId: "linkedIn",
          logo: "/uploads/linkedin.svg",
          label: "LinkedIn",
          url: "#",
        },
        {
          sectionId: "youTube",
          logo: "/uploads/youtube.svg",
          label: "YouTube",
          url: "#",
        },
      ],
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
