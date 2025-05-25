"use client";

import Link from "next/link";
import Image from "next/image";

import { gsap } from "gsap";
import { Button } from "./button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const FeaturesSectionThree = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          [
            imageRef.current,
            headingRef.current,
            paragraphRef.current,
            buttonRef.current,
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
                imageRef.current,
                headingRef.current,
                paragraphRef.current,
                buttonRef.current,
              ],
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
        gsap.set(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          transformOrigin: "center center",
        });

        gsap.set(headingRef.current, {
          opacity: 0,
          y: 50,
          rotationX: 15,
        });

        gsap.set(paragraphRef.current, {
          opacity: 0,
          y: 30,
        });

        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.9,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        })
          .to(
            headingRef.current,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            paragraphRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            buttonRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            "-=0.2"
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const relativeX = (mouseX - centerX) / (rect.width / 2);
    const relativeY = (mouseY - centerY) / (rect.height / 2);

    const rotation = relativeX * 3;

    const translateX = relativeX * 2;
    const translateY = relativeY * 2 - 3;

    gsap.to(button, {
      scale: 1.05,
      x: translateX,
      y: translateY,
      rotation: rotation,
      boxShadow: "0 10px 30px rgba(231, 88, 55, 0.4)",
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      boxShadow: "0 0px 0px rgba(231, 88, 55, 0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-14">
        <div
          ref={imageRef}
          className="order-2 md:order-1 will-change-transform"
        >
          <Image
            src="/features-three.jpg"
            alt="Flexible invoicing, payment, and policies feature"
            width={400}
            height={400}
            className="rounded-[3rem] sm:rounded-[5rem] w-full h-auto"
          />
        </div>
        <div className="mx-auto order-1 md:order-2">
          <h2
            ref={headingRef}
            className="sm:max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
          >
            Flexible invoicing, payment, and policies
          </h2>
          <p
            ref={paragraphRef}
            className="sm:max-w-lg text-base sm:text-lg font-light text-muted-foreground pt-8 will-change-transform"
          >
            Take any stress or awkwardness out of getting paid. Send invoices,
            accept payment, & enforce policies at the push of a button.
          </p>
          <div ref={buttonRef} className="pt-8 will-change-transform">
            <Link href="/features">
              <Button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                style={{ willChange: "transform" }}
              >
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
