"use client";

import Link from "next/link";

import { gsap } from "gsap";
import { Button } from "./button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PricingHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
      duration: prefersReducedMotion() ? 0.1 : 1.0,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.6,
      slowDuration: prefersReducedMotion() ? 0.15 : 1.4,
      ease: "power3.out",
      bounceEase: "back.out(1.7)",
      elasticEase: "elastic.out(1, 0.3)",
      stagger: prefersReducedMotion() ? 0.02 : 0.2,
      fastStagger: prefersReducedMotion() ? 0.01 : 0.1,
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
          [containerRef.current, headingRef.current, buttonRef.current],
          {
            opacity: 0,
          }
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(
              [containerRef.current, headingRef.current, buttonRef.current],
              {
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              }
            );
          },
        });
      } else {
        // Set initial states for sophisticated entrance animations
        gsap.set(containerRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 40,
          transformOrigin: "center center",
        });

        gsap.set(headingRef.current, {
          opacity: 0,
          x: mobile ? 0 : -80,
          y: mobile ? 60 : 40,
          rotationX: mobile ? 0 : 15,
          scale: 0.9,
          transformOrigin: "center center",
        });

        gsap.set(buttonRef.current, {
          opacity: 0,
          x: mobile ? 0 : 80,
          y: mobile ? 40 : 30,
          scale: 0.8,
          rotationY: mobile ? 0 : 10,
          transformOrigin: "center center",
        });

        // Create sophisticated entrance timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(containerRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: animationConfig.slowDuration,
          ease: animationConfig.bounceEase,
        })
          .to(
            headingRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: animationConfig.slowDuration,
              ease: animationConfig.elasticEase,
            },
            "-=1.0"
          )
          .to(
            buttonRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
            },
            "-=0.6"
          );

        // Add scroll-based parallax effects that reset to y-position 0
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
                  [containerRef.current, headingRef.current, buttonRef.current],
                  {
                    y: 0,
                    x: 0,
                  }
                );
                return;
              }

              gsap.to(containerRef.current, {
                y: progress * 50,
                duration: 0.3,
                ease: "sine.out",
              });

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
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [getAnimationConfig, prefersReducedMotion, isMobile]);

  // Sophisticated button hover effects
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    const config = getAnimationConfig();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = (mouseX - centerX) * 0.15;
    const deltaY = (mouseY - centerY) * 0.15;
    const rotation = isMobile() ? 0 : (mouseX - centerX) * 0.05;

    gsap.to(button, {
      scale: 1.05,
      x: deltaX,
      y: deltaY,
      rotation: rotation,
      boxShadow: "0 10px 30px rgba(231, 88, 55, 0.3)",
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
      boxShadow: "0 0px 0px rgba(231, 88, 55, 0)",
      duration: config.duration,
      ease: config.ease,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 md:py-36 max-w-[1240px] px-5 xl:px-0 mx-auto"
    >
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto will-change-transform"
      >
        <h1
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-ovo will-change-transform"
        >
          The software you need for less than a paw and a tail
        </h1>
        <div
          ref={buttonRef}
          className="pt-10 flex justify-center will-change-transform"
        >
          <Link href="/">
            <Button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              style={{ willChange: "transform" }}
            >
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
