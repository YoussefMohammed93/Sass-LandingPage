"use client";

import Link from "next/link";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

import { Button } from "./button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  const getAnimationConfig = useCallback(
    () => ({
      duration: prefersReducedMotion() ? 0.1 : 1.4,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.6,
      slowDuration: prefersReducedMotion() ? 0.15 : 1.0,
      backgroundDuration: prefersReducedMotion() ? 0.1 : 1.4,
      ease: "power2.out",
      bounceEase: "back.out(1.2)",
      elasticEase: "elastic.out(0.8, 0.4)",
      stagger: prefersReducedMotion() ? 0.02 : 0.15,
      fastStagger: prefersReducedMotion() ? 0.01 : 0.08,
    }),
    [prefersReducedMotion]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animationConfig = getAnimationConfig();
      const prefersReducedMotionValue = prefersReducedMotion();
      const mobile = isMobile();

      if (prefersReducedMotionValue) {
        gsap.set(
          [
            backgroundRef.current,
            headingRef.current,
            buttonRef.current,
            logoRef.current,
            navRef.current,
            copyrightRef.current,
          ],
          {
            opacity: 0,
          }
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(
              [
                backgroundRef.current,
                headingRef.current,
                buttonRef.current,
                logoRef.current,
                navRef.current,
                copyrightRef.current,
              ],
              {
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power4.out",
              }
            );
          },
        });
      } else {
        gsap.set(backgroundRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.set(headingRef.current, {
          opacity: 0,
          y: 60,
          rotationX: mobile ? 0 : 15,
          transformOrigin: "center center",
        });

        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          rotationY: mobile ? 0 : -10,
          transformOrigin: "center center",
        });

        gsap.set(logoRef.current, {
          opacity: 0,
          x: -30,
          scale: 0.8,
          rotation: mobile ? 0 : -5,
          transformOrigin: "center center",
        });

        gsap.set(navRef.current?.children || [], {
          opacity: 0,
          y: 30,
          x: -20,
          scale: 0.9,
          rotationY: mobile ? 0 : 8,
          transformOrigin: "center center",
        });

        gsap.set(copyrightRef.current, {
          opacity: 0,
          y: 20,
          x: mobile ? 0 : 20,
          scale: 0.95,
          transformOrigin: "center center",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          onEnter: () => {
            const mainTimeline = gsap.timeline();

            mainTimeline
              .to(backgroundRef.current, {
                scaleX: 1,
                duration: animationConfig.backgroundDuration,
                ease: "power1.out",
              })
              .to(
                headingRef.current,
                {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  duration: animationConfig.duration,
                  ease: animationConfig.elasticEase,
                },
                "-=1.0"
              )
              .to(
                buttonRef.current,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  duration: animationConfig.duration,
                  ease: animationConfig.bounceEase,
                },
                "-=0.8"
              )
              .to(
                logoRef.current,
                {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotation: 0,
                  duration: animationConfig.duration,
                  ease: animationConfig.elasticEase,
                },
                "-=0.6"
              )
              .to(
                navRef.current?.children || [],
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  rotationY: 0,
                  duration: animationConfig.duration,
                  ease: animationConfig.bounceEase,
                  stagger: {
                    amount: animationConfig.stagger * 3,
                    from: "start",
                    ease: "power1.out",
                  },
                },
                "-=0.4"
              )
              .to(
                copyrightRef.current,
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: 1,
                  duration: animationConfig.slowDuration,
                  ease: animationConfig.ease,
                },
                "-=0.2"
              );
          },
        });

        if (!mobile) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              if (progress === 0) {
                gsap.set(
                  [
                    headingRef.current,
                    buttonRef.current,
                    logoRef.current,
                    copyrightRef.current,
                  ],
                  {
                    y: 0,
                    x: 0,
                  }
                );

                if (navRef.current?.children) {
                  gsap.set(navRef.current.children, { y: 0, x: 0 });
                }
                return;
              }

              gsap.to(headingRef.current, {
                y: progress * 30,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(buttonRef.current, {
                y: progress * 20,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(logoRef.current, {
                y: progress * 25,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(navRef.current?.children || [], {
                y: progress * 15,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(copyrightRef.current, {
                y: progress * 10,
                duration: 0.3,
                ease: "sine.out",
              });
            },
          });
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [getAnimationConfig, prefersReducedMotion, isMobile]);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    const config = getAnimationConfig();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const relativeX = (mouseX - centerX) / (rect.width / 2);
    const relativeY = (mouseY - centerY) / (rect.height / 2);

    const rotation = relativeX * 2;
    const translateX = relativeX * 3;
    const translateY = relativeY * 2;

    gsap.to(button, {
      scale: 1.05,
      x: translateX,
      y: translateY,
      rotation: rotation,
      boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)",
      duration: config.duration,
      ease: config.bounceEase,
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    const config = getAnimationConfig();
    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      boxShadow: "0 0px 0px rgba(255, 255, 255, 0)",
      duration: config.duration,
      ease: config.ease,
    });
  };

  return (
    <footer ref={sectionRef} className="relative overflow-hidden py-16">
      {/* Animated background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-primary"
        style={{ transformOrigin: "left center" }}
      />

      {/* Content container */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-5 sm:mb-12">
          <div className="sm:col-span-7 lg:col-span-8">
            <h2
              ref={headingRef}
              className="text-center sm:text-start text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-ovo text-white"
            >
              Get started in seconds
            </h2>
          </div>
          <div className="sm:col-span-5 lg:col-span-4 flex flex-col sm:flex-row-reverse gap-4">
            <div ref={buttonRef}>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                Start for free
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-12">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div ref={logoRef}>
              <Image
                src="/mobile-logo.svg"
                alt="Critter Care Logo"
                className="h-10 w-auto"
                width={54}
                height={40}
              />
            </div>
            <nav ref={navRef}>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/features"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="text-center sm:text-right pt-10 sm:pt-0">
            <p ref={copyrightRef} className="text-white text-sm">
              © {new Date().getFullYear()} Critter Care, Inc
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
