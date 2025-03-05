import { footerData } from "../data/siteConfig";

export const getStaticProps = async () => {
  const logo = footerData.logo;
  const footerLinks = footerData.links;
  const footerIcons = footerData.socialIcons;

  return {
    props: {
      logo,
      footerLinks,
      footerIcons,
    },
  };
};
