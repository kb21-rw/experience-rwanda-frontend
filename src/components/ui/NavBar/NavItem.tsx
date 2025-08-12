"use client";
import Link from "next/link";

export type NavItemProp = {
  href: string;
  sectionId: string;
  label: string;
  data_test_id?: string;
  onClick?: () => void;
  isActive?: boolean;
  isMobile?: boolean;
};

const NavItem = ({
  href,
  sectionId,
  label,
  data_test_id,
  onClick,
  isActive,
  isMobile,
}: NavItemProp) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.includes("#") || href === "/") {
      e.preventDefault();
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  if (isMobile) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        data-testid={data_test_id}
        className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
          isActive
            ? "text-green-700 bg-green-700/10 translate-x-2"
            : "text-white hover:text-green-700 hover:bg-green-700/10 hover:translate-x-1"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-testid={data_test_id}
      className={`relative px-1 py-2 font-medium transition-all duration-300 group ${
        isActive ? "text-green-700" : "text-white hover:text-green-700"
      }`}
    >
      {label}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform origin-left transition-transform duration-300 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
};

export default NavItem;
