export const navbarData = {
  logo: {
    alt: "Experience Rwanda Logo",
    src: "/logo.png",
  },
  navLinks: [
    {
      data_test_id:"home",
      href: "./#home",
      sectionId: "home",
      label: "Home",
    },
    {
      data_test_id:"about",
      href: "./#about",
      sectionId: "about",
      label: "About us",
    },
    {
      data_test_id:"trips",
      href: "./#trips",
      sectionId: "trips",
      label: "Trips",
    },
    {
      data_test_id:"contact",
      href: "/contact",
      sectionId: "/contact",
      label: "Contact us",
    },
  ],
} as const;
