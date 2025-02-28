export type NavLinks = {
  label: string;
  path: string;
};

export type Logo = {
  title: string;
  url: string;
};

export type NavItems = {
  logo: Logo;
  navLinks: NavLinks[];
};

export type NavItemProps = {
  href: string;
  pathname: string;
  children: React.ReactNode;
  onClick?: () => void;
}