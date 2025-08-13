"use client";

import React from "react";
import Link from "next/link";

export interface NavItemProps {
  href: string;
  sectionId: string;
  label: string;
  data_test_id?: string;
  onClick?: () => void;
  isActive?: boolean;
  isMobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  sectionId,
  label,
  data_test_id,
  onClick,
  isActive = false,
  isMobile = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.includes("#") || href === "/") {
      e.preventDefault();

      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    onClick?.();
  };

  if (isMobile) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        data-testid={data_test_id}
        className={`block py-3 px-4 rounded-none font-medium transition-all duration-300 ${
          isActive
            ? "text-green-700 bg-green-700/10 translate-x-2 underline underline-offset-4"
            : "text-green-700 hover:text-green-700/80 hover:bg-green-700/10 hover:translate-x-1"
        }`}
        aria-current={isActive ? "page" : undefined}
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
        isActive
          ? "text-green-700 underline underline-offset-4"
          : "text-green-700 hover:text-green-700/80"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {!isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
      )}
    </Link>
  );
};

export default NavItem;
