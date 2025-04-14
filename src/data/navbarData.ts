export const navbarData = {
  logo: {
    title: "ExperienceRw",
    url: "./",
  },
  navLinks: [
    {
      href: "./",
      sectionId: "home",
      label: "Home",
    },
    {
      href: "./#about",
      sectionId: "about",
      label: "About us",
    },
    {
      href: "./#bookings",
      sectionId: "bookings",
      label: "Bookings",
    },
    {
      href: "/contact",
      sectionId: "/contact",
      label: "Contact us",
    },
  ],
} as const;
