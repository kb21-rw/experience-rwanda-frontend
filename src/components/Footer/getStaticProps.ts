import { siteConfigData } from "../../../public/data/siteConfig";

export const getStaticProps = async () => {
  const logo = siteConfigData.data.attributes.footer.logo;
  const footerLinks = siteConfigData.data.attributes.footer.footerLinks;
  const footerIcons = siteConfigData.data.attributes.footer.footerIcons;

  return {
    props: {
      logo,
      footerLinks,
      footerIcons,
    },
  };
};
