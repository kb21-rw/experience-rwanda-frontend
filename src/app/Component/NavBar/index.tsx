"use client"
import React, { useState } from "react";
import NavItem from "./NavItem";
import MenuIcon from "../../assets/MenuIcon";
import CloseIcon from "../../assets/CloseIcon";
import Link from "next/link";
import {  NavLink } from "@/types/NavItems.types";
import { navbarData } from "../../../data/navbarData";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logo, navLinks} = navbarData

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-black text-white flex justify-between font-inter font-black p-6 md:px-32 md:py-12 md:flex md:justify-between md:items-center">
      <div className="text-lg">
        <Link href={logo.url}>{logo.title}</Link>
      </div>
      <div className="hidden text-base md:space-x-12 md:flex md: justify-between md:items-center">
        {navLinks.map((item:NavLink)=> (
          <NavItem
          key={item.path}
          href={item.path}
          onClick={toggleMenu}>{item.label}</NavItem>

        ))}

      </div>
      <div className="flex justify-between items-center flex-col absolute right-6 space-x-4 md:hidden">
        <button aria-label = {isOpen ? "close menu" : "open menu"} onClick={toggleMenu}>{isOpen ? <CloseIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/> }</button>
      </div>
      {isOpen && (
        <div className="text-start flex w-full p-24 bg-black md:hidden">
          <div className="flex absolute top-16 left-0 flex-col space-y-4 py-4 px-6">
            {navLinks.map((item:NavLink) => (
              <NavItem
                key={item.path}
                href={item.path}
                onClick={toggleMenu}
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