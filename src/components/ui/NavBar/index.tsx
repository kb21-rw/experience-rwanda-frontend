"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import NavItem from "./NavItem";
import { Button } from "../Button";
import { navbarData } from "@/data/navbarData";

const SCROLL_THRESHOLD = 20;
const SCROLL_OFFSET = 100;

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const { logo, navLinks } = navbarData;
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setScrolled(currentScrollY > SCROLL_THRESHOLD);

    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter(Boolean);

    const scrollPos = currentScrollY + SCROLL_OFFSET;

    for (const section of sections) {
      if (
        section &&
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        setActiveSection(section.id);
        break;
      }
    }
  }, [navLinks]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setActiveSection(pathname === "/" ? "home" : pathname);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, pathname]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-blue-700/95 backdrop-blur-md py-3" : "bg-blue-700 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2">
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
                onClick={closeMenu}
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
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
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
                  onClick={closeMenu}
                  isMobile
                  href={item.href}
                />
              ))}
              
            <Link
              href="/"
              className="hidden md:inline-block bg-green-700 hover:bg-green-700/90 text-blue-700 px-6 py-2 rounded-none transition-colors font-medium"
            >
              Book Trip
            </Link>
          
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
};

export default NavBar;
