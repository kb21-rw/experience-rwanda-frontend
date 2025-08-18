"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import NavItem from "./NavItem";
import { Button } from "../Button";
import { navbarData } from "@/data/navbarData";
import { useScrollSections } from "@/hooks/useScrollSection";
import { useToggle } from "@/hooks/useToogle";


const NavBar: React.FC = () => {
  const { logo, navLinks } = navbarData;
  const pathname = usePathname();

  const { activeSection, scrolled } = useScrollSections(navLinks);
  const { isOpen, toggle, close } = useToggle(false);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-blue-700/95 backdrop-blur-md py-3" : "bg-blue-700 py-4"
        }`}
      >
        <div className="content-wrapper flex justify-between items-center py-2">
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => (
              <NavItem
                key={item.sectionId}
                {...item}
                isActive={activeSection === item.sectionId}
                onClick={close}
                href={item.href}
              />
            ))}
          </div>

          {pathname === "/" && (
            <Link
              href="/"
              className="hidden md:inline-block bg-green-700 hover:bg-green-700/90 text-blue-700 px-6 py-2 rounded-none transition-colors font-medium"
            >
              Book Trip
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="p-3 md:hidden text-green-700 hover:bg-green-700/20 rounded-none"
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-10 h-10" />
            ) : (
              <Menu className="w-10 h-10" />
            )}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-700 border-t border-green-700/20 shadow-lg">
            <div className="p-4 space-y-2">
              {navLinks.map((item) => (
                <NavItem
                  key={item.sectionId}
                  {...item}
                  isActive={activeSection === item.sectionId}
                  onClick={close}
                  isMobile
                  href={item.href}
                />
              ))}

              {pathname === "/" && (
                <Link
                  href="/"
                  className="block w-full text-center bg-green-700 hover:bg-green-700/90 text-blue-700 px-6 py-2 rounded-none transition-colors font-medium"
                >
                  Book Trip
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
};

export default NavBar;
