import { footerData } from "../../../public/data/siteConfig";

export const getStaticProps = async () => {
  const logo = footerData.footer.logo;
  const footerLinks = footerData.footer.links;
  const footerIcons = footerData.footer.socialIcons;

  return {
    props: {
      logo,
      footerLinks,
      footerIcons,
    },
  };
};
