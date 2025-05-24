"use client";

import Link from "next/link";
import Image from "next/image";

import { Logo } from "./logo";
import { Button } from "./button";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

export const Header = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerLinks = [
    {
      href: "/features",
      label: "Features",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/contact-us",
      label: "Contact us",
    },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-background">
        <div className="flex items-center justify-between max-w-[1320px] mx-auto px-5 py-3 md:py-5">
          <div className="flex items-center justify-between w-full md:hidden">
            <Logo />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-primary-5 transition-colors duration-150 relative z-50"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <HiMenu className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between w-full">
            <nav>
              <ul className="flex items-center gap-5 md:gap-10">
                {headerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base sm:text-lg font-light hover:text-primary ease-in duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Logo />
            <Button>Start for free</Button>
          </div>
        </div>
      </header>
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 z-[51] w-full h-full bg-primary transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="relative w-14 h-14">
            <Image src="/mobile-logo.svg" alt="Logo" fill />
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md hover:bg-white/15 transition-colors duration-150"
            aria-label="Close mobile menu"
          >
            <HiX className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center pt-[150px] flex-1 px-5">
          <nav className="mb-8">
            <ul className="flex flex-col items-center gap-8">
              {headerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-2xl font-light hover:text-gray-200 transition-colors duration-150"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button variant="secondary" onClick={closeMobileMenu}>
            Start for free
          </Button>
        </div>
      </div>
    </>
  );
};
