import { siteConfigData } from "../../../public/data/siteConfig";

export const getStaticProps = async () => {
  const logo = siteConfigData.footer.logo;
  const footerLinks = siteConfigData.footer.links;
  const footerIcons = siteConfigData.footer.socialIcons;

  return {
    props: {
      logo,
      footerLinks,
      footerIcons,
    },
  };
};
