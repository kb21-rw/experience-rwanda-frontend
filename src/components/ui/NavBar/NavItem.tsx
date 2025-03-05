import React from "react";
export type NavItemProp = {
  sectionId: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean
};
const NavItem: React.FC<NavItemProp> = ({ sectionId, children, onClick, isActive }) => {
  const scrollToSection = (e:React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if(element) {
      element.scrollIntoView({behavior:"smooth"});
      if(onClick) onClick();
    }
  }

  return (
    <button
      
      onClick={scrollToSection}
      className={`hover:underline ${isActive ? "underline text-blue-300" : ""}`}
    >
      {children}
    </button>
  );
};

export default NavItem;
