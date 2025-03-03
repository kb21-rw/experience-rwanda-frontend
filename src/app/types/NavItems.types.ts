export type NavItemProps = {
  href: string;
  pathname: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export type navLink = {
  path: string;
  label: string;
}
export type NavItems = {
  logo: {
    title: string;
    url: string;
  };
  navLinks: navLink[];
}