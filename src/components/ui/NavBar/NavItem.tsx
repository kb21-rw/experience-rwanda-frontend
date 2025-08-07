"use client";
import Link from "next/link";

export type NavItemProp = {
  href: string;
  sectionId: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  data_test_id?:string;
};
const NavItem: React.FC<NavItemProp> = ({
  href,
  sectionId,
  children,
  onClick,
  isActive,
  data_test_id,
}) => {
  const scrollToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (onClick) onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (href === "/") {
          scrollToSection(e);
        }
      }}
      data-testId={data_test_id}
      className={`hover:underline ${isActive ? "underline text-blue-300" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavItem;
