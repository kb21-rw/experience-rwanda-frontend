export type NavItemProps = {
    href: string;
    pathname: string;
    children: React.ReactNode;
    onClick?: () => void;
  };