"use client";
import React, { useState, useEffect } from "react";
import NavItem from "./NavItem";
import MenuIcon from "../../../assets/MenuIcon";
import CloseIcon from "../../../assets/CloseIcon";
import { navbarData } from "@/data/navbarData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = {
  sectionId: string;
  label: string;
  href: string;
  data_test_id:string
};

export type NavData = {
  logo: {
    title: string;
  };
  navLinks: NavLink[];
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { logo, navLinks } = navbarData;
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) =>
        document.getElementById(link.sectionId)
      );
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    if (pathname === "/") {
      setActiveSection("home");
    } else {
      setActiveSection(pathname);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white flex justify-between font-inter font-black p-6 md:px-32 md:py-12 md:flex md:justify-between md:items-center sticky top-0 z-50">
      <Link href="/" className="text-lg">
        <span>{logo.title}</span>
      </Link>
      <div className="hidden text-base md:space-x-12 md:flex md:justify-between md:items-center">
        {navLinks.map((item: NavLink) => (
          <NavItem
            key={item.sectionId}
            sectionId={item.sectionId}
            href={item.href}
            onClick={toggleMenu}
            isActive={activeSection === item.sectionId}
            data_test_id={item.data_test_id}
          >
            {item.label}
          </NavItem>
        ))}
      </div>
      <div className="flex justify-between items-center flex-col absolute right-6 space-x-4 md:hidden">
        <button
          aria-label={isOpen ? "close menu" : "open menu"}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="text-start flex w-full p-24 bg-black md:hidden">
          <div className="flex absolute top-16 left-0 flex-col space-y-4 py-4 px-6">
            {navLinks.map((item: NavLink) => (
              <NavItem
                key={item.sectionId}
                sectionId={item.sectionId}
                onClick={toggleMenu}
                href={item.href}
                isActive={activeSection === item.sectionId}
              >
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
