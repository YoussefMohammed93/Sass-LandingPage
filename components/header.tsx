"use client";

import Link from "next/link";
import Image from "next/image";

import { gsap } from "gsap";
import { Logo } from "./logo";
import { Button } from "./button";
import { HiMenu, HiX } from "react-icons/hi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const mobileCtaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);
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

  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const animationConfig = {
    duration: prefersReducedMotion() ? 0.1 : 0.8,
    fastDuration: prefersReducedMotion() ? 0.05 : 0.4,
    slowDuration: prefersReducedMotion() ? 0.15 : 1.2,
    ease: "power3.out",
    bounceEase: "back.out(1.7)",
    elasticEase: "elastic.out(1, 0.3)",
    stagger: prefersReducedMotion() ? 0.02 : 0.15,
    fastStagger: prefersReducedMotion() ? 0.01 : 0.08,
  };

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({ delay: 0.2 });

    const allElements = [
      headerRef.current,
      logoRef.current,
      ctaButtonRef.current,
      mobileMenuButtonRef.current,
    ].filter(Boolean);

    gsap.set(allElements, {
      opacity: 0,
      y: -50,
      scale: 0.8,
      rotationX: -15,
    });

    if (navLinksRef.current) {
      gsap.set(navLinksRef.current.children, {
        opacity: 0,
        y: -40,
        scale: 0.9,
        rotationY: -10,
      });
    }

    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: animationConfig.slowDuration,
      ease: animationConfig.bounceEase,
    })
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: animationConfig.duration,
          ease: animationConfig.elasticEase,
        },
        "-=0.8"
      )
      .to(
        navLinksRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: animationConfig.duration,
          ease: animationConfig.bounceEase,
          stagger: {
            amount: animationConfig.stagger * 3,
            from: "start",
            ease: "power2.out",
          },
        },
        "-=0.6"
      )
      .to(
        [ctaButtonRef.current, mobileMenuButtonRef.current],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: animationConfig.duration,
          ease: animationConfig.elasticEase,
          stagger: animationConfig.fastStagger,
        },
        "-=0.4"
      )
      .to(
        allElements,
        {
          scale: 1.02,
          duration: animationConfig.fastDuration,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        "-=0.2"
      );

    if (!prefersReducedMotion()) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top -20px",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (headerRef.current) {
            const progress = self.progress;
            gsap.to(headerRef.current, {
              backgroundColor:
                progress > 0
                  ? "rgba(247, 242, 234, 0.95)"
                  : "rgba(247, 242, 234, 1)",
              backdropFilter: progress > 0 ? "blur(15px)" : "blur(0px)",
              boxShadow:
                progress > 0
                  ? "0 4px 20px rgba(0, 0, 0, 0.1)"
                  : "0 0 0 rgba(0, 0, 0, 0)",
              y: progress > 0.1 ? -2 : 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
        onEnter: () => {
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              scale: 0.98,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
        onLeave: () => {
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        },
      });
    }

    if (!prefersReducedMotion() && logoRef.current) {
      gsap.to(logoRef.current, {
        y: -2,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    animationConfig.bounceEase,
    animationConfig.duration,
    animationConfig.elasticEase,
    animationConfig.fastDuration,
    animationConfig.fastStagger,
    animationConfig.slowDuration,
    animationConfig.stagger,
  ]);

  const animateMobileMenuOpen = () => {
    if (!mobileMenuRef.current || prefersReducedMotion()) return;

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    gsap.set(mobileMenuRef.current, {
      y: "-100%",
      scale: 0.9,
      opacity: 0,
    });

    if (mobileNavRef.current) {
      gsap.set(mobileNavRef.current.children, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotationX: -20,
      });
    }

    if (mobileCtaRef.current) {
      gsap.set(mobileCtaRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.7,
        rotation: -5,
      });
    }

    tl.to(mobileMenuRef.current, {
      y: "0%",
      scale: 1,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.bounceEase,
    })
      .to(
        mobileNavRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: animationConfig.duration,
          ease: animationConfig.elasticEase,
          stagger: {
            amount: animationConfig.stagger * 2,
            from: "start",
            ease: "power2.out",
          },
        },
        "-=0.4"
      )
      .to(
        mobileCtaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: animationConfig.duration,
          ease: animationConfig.bounceEase,
        },
        "-=0.3"
      )
      .to(
        [mobileNavRef.current?.children || [], mobileCtaRef.current],
        {
          scale: 1.05,
          duration: animationConfig.fastDuration,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        "-=0.1"
      );
  };

  const animateMobileMenuClose = () => {
    if (!mobileMenuRef.current || prefersReducedMotion()) return;

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    tl.to([mobileNavRef.current?.children || [], mobileCtaRef.current], {
      opacity: 0,
      y: -30,
      scale: 0.8,
      rotationX: 15,
      duration: animationConfig.fastDuration,
      ease: "power3.in",
      stagger: {
        amount: animationConfig.fastStagger * 2,
        from: "end",
        ease: "power2.in",
      },
    }).to(
      mobileMenuRef.current,
      {
        y: "-100%",
        scale: 0.9,
        opacity: 0,
        duration: animationConfig.duration,
        ease: "power3.in",
      },
      "-=0.1"
    );
  };

  const toggleMobileMenu = () => {
    if (isAnimating) return;

    if (!isMobileMenuOpen) {
      setIsMobileMenuOpen(true);
      animateMobileMenuOpen();
    } else {
      animateMobileMenuClose();
      setTimeout(
        () => setIsMobileMenuOpen(false),
        animationConfig.duration * 1000
      );
    }
  };

  const closeMobileMenu = () => {
    if (isAnimating || !isMobileMenuOpen) return;

    animateMobileMenuClose();
    setTimeout(
      () => setIsMobileMenuOpen(false),
      animationConfig.duration * 1000
    );
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    gsap.to(e.currentTarget, {
      scale: 1.05,
      y: -2,
      rotation: 1,
      boxShadow: "0 8px 25px rgba(231, 88, 55, 0.3)",
      duration: animationConfig.fastDuration,
      ease: animationConfig.bounceEase,
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      rotation: 0,
      boxShadow: "0 0 0 rgba(231, 88, 55, 0)",
      duration: animationConfig.fastDuration,
      ease: "power2.out",
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="w-full fixed top-0 left-0 z-50 bg-[#fbf8f3]"
      >
        <div className="flex items-center justify-between max-w-[1320px] mx-auto px-5 py-4 md:py-5">
          <div className="flex items-center justify-between w-full md:hidden">
            <div>
              <Logo />
            </div>
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              onMouseLeave={handleButtonLeave}
              className="p-2 rounded-md hover:bg-primary-5 transition-colors duration-150 relative z-50"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              disabled={isAnimating}
            >
              <HiMenu className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between w-full">
            <nav>
              <ul
                ref={navLinksRef}
                className="flex items-center gap-5 md:gap-10"
              >
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
            <div>
              <Logo />
            </div>
            <div ref={ctaButtonRef}>
              <Button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                Start for free
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 z-[51] w-full h-full bg-primary transform md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ transform: "translateY(-100%)" }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="relative w-14 h-14">
            <Image src="/mobile-logo.svg" alt="Logo" fill />
          </Link>
          <button
            onClick={closeMobileMenu}
            onMouseLeave={handleButtonLeave}
            className="p-2 rounded-md hover:bg-white/15 transition-colors duration-150"
            aria-label="Close mobile menu"
            disabled={isAnimating}
          >
            <HiX className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center pt-[150px] flex-1 px-5">
          <nav ref={mobileNavRef} className="mb-8">
            <ul className="flex flex-col items-center gap-10">
              {headerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-2xl font-light hover:text-white/80 transition-colors duration-150"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div ref={mobileCtaRef}>
            <Button
              variant="secondary"
              onClick={closeMobileMenu}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Start for free
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
