"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
  sectionId: string;
}

const SCROLL_THRESHOLD = 20;
const SCROLL_OFFSET = 100;

export function useScrollSections(navLinks: NavLink[]) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  return { activeSection, scrolled };
}
