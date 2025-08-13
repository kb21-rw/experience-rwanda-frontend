"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import { Menu, X } from "lucide-react";
import { navbarData } from "@/data/navbarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../Button";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { logo, navLinks } = navbarData;
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) =>
        document.getElementById(link.sectionId)
      );
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    setActiveSection(pathname === "/" ? "home" : pathname);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-blue-700/95 backdrop-blur-md py-3" : "bg-blue-700 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
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
                onClick={() => setIsOpen(false)}
              />
            ))}
            <Button className="bg-green-700 hover:bg-green-700/90 text-blue-700">
              Book Trip
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="p-3 md:hidden text-green-700 hover:bg-green-700/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-10 h-10" />
            ) : (
              <Menu className="w-10 h-10" />
            )}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-blue-700 border-t border-green-700/20 animate-fade-in">
            <div className="p-4 space-y-4">
              {navLinks.map((item) => (
                <NavItem
                  key={item.sectionId}
                  {...item}
                  isActive={activeSection === item.sectionId}
                  onClick={() => setIsOpen(false)}
                  isMobile
                />
              ))}
              <Button className="w-full mt-4 bg-green-700 hover:bg-green-700/90 text-blue-700">
                Book Trip
              </Button>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
};

export default NavBar;
