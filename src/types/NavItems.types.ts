export type NavItemProp = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export type NavLink = {
  path: string;
  label: string;
}
export type NavItem = {
  logo: {
    title: string;
    url: string;
  };
  navLinks: NavLink[];
}