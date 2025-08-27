export type IconName = "linkedin" | "twitter" | "youtube";

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

export type FooterLink = {
  title: string;
  links: Links[];
};
export type Links = {
  sectionId: string;
  isExternal: boolean;
  logo: string | null;
  label: string;
  url: string;
};

export type LegalLink = {
  title: string;
  url: string;
};

export type FooterData = {
  logo: string;
  footerLinks: FooterLink[];
  legalLinks: LegalLink[];
};
