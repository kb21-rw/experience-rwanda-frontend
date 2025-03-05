export type IconName = "instagram" | "twitter" | "youtube";

export type IconAttributes = {
    name: string;
    alternativeText: string | null;
    url: string;
    width: number;
    height: number;
  };
  
  export type IconData = {
    id: number;
    attributes: IconAttributes;
  };
  
  export type FooterIcon = {
    title: IconName
    url: string;
    icon: {
      data: IconData;
    };
  };
  
  export type FooterLink = {
    id: number;
    name: string;
    url: string;
  };
  
  export type FooterData = {
    logo: string;
    footerLinks: FooterLink[];
    footerIcons: FooterIcon[];
  };
  