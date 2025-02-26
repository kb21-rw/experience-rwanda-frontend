
export type IconName = "instagram" | "twitter" | "youtube";

export type FooterIcon = {
    name: IconName;
}

export type FooterData = {
    logo: string;
    footerLinks: string[];
    footerIcons: FooterIcon[];
}