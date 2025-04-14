export const navbarData = {
  logo: {
    title: "ExperienceRw",
    url: "./",
  },
  navLinks: [
    {
      href: "./#home",
      sectionId: "home",
      label: "Home",
    },
    {
      href: "./#about",
      sectionId: "about",
      label: "About us",
    },
    {
      href: "./#trips",
      sectionId: "trips",
      label: "Trips",
    },
    {
      href: "/contact",
      sectionId: "/contact",
      label: "Contact us",
    },
  ],
} as const;
