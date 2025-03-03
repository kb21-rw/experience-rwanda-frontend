import { siteConfigData } from "../../../public/data/siteConfig";

export const getStaticProps = async () => {
  const logo = siteConfigData.data.footer.logo;
  const footerLinks = siteConfigData.data.footer.footerLinks;
  const footerIcons = siteConfigData.data.footer.footerIcons;

  return {
    props: {
      logo,
      footerLinks,
      footerIcons,
    },
  };
};
