"use client";

import Image from "next/image";

import { gsap } from "gsap";
import { Button } from "./button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const getAnimationConfig = useCallback(
    () => ({
      duration: prefersReducedMotion() ? 0.1 : 0.8,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.4,
      slowDuration: prefersReducedMotion() ? 0.15 : 1.2,
      ease: "power3.out",
      bounceEase: "back.out(1.7)",
      elasticEase: "elastic.out(1, 0.3)",
      stagger: prefersReducedMotion() ? 0.02 : 0.15,
      fastStagger: prefersReducedMotion() ? 0.01 : 0.08,
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const animationConfig = getAnimationConfig();

    const ctx = gsap.context(() => {
      const textElements = [
        headingRef.current,
        subheadingRef.current,
        buttonRef.current,
      ];
      const imageElements = [
        heroImageRef.current,
        phoneRef.current,
        card1Ref.current,
        card2Ref.current,
      ];

      gsap.set(textElements, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        rotationX: -15,
      });

      gsap.set(imageElements, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationY: 10,
      });

      const mainTimeline = gsap.timeline({ delay: 0.5 });

      mainTimeline
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: animationConfig.slowDuration,
          ease: animationConfig.bounceEase,
        })
        .to(
          subheadingRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
          },
          "-=0.6"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: animationConfig.duration,
            ease: animationConfig.elasticEase,
          },
          "-=0.4"
        );

      mainTimeline
        .to(
          heroImageRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
          },
          "-=0.3"
        )
        .to(
          phoneRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: animationConfig.duration,
            ease: animationConfig.bounceEase,
          },
          "-=0.5"
        )
        .to(
          [card1Ref.current, card2Ref.current],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: animationConfig.duration,
            ease: animationConfig.elasticEase,
            stagger: animationConfig.stagger,
          },
          "-=0.4"
        );

      if (!prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(heroImageRef.current, {
              y: progress * 200,
              duration: 0.3,
              ease: "sine",
            });
            gsap.to(phoneRef.current, {
              y: progress * 150,
              duration: 0.3,
              ease: "sine",
            });
            gsap.to([card1Ref.current, card2Ref.current], {
              y: progress * 80,
              duration: 0.3,
              ease: "sine",
            });
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [getAnimationConfig]);

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

    const rotation = relativeX * 3;

    const translateX = relativeX * 2;
    const translateY = relativeY * 2 - 3;

    gsap.to(button, {
      scale: 1.05,
      x: translateX,
      y: translateY,
      rotation: rotation,
      boxShadow: "0 10px 30px rgba(231, 88, 55, 0.4)",
      duration: config.fastDuration,
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
      duration: config.fastDuration,
      ease: config.ease,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background min-h-dvh md:min-h-[70vh] md-custom:min-h-screen xl:min-h-[11 0dvh] max-w-[1320px] mx-5 sm:mx-auto px-5 overflow-hidden rounded-br-[3rem] rounded-bl-[3rem] sm:rounded-br-[6rem] sm:rounded-bl-[6rem]"
      style={{ willChange: "transform" }}
    >
      <div className="relative z-10">
        <h1
          ref={headingRef}
          className="max-w-5xl mx-auto text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground pt-28 md:pt-40 md-custom:pt-28 font-ovo"
          style={{ willChange: "transform, opacity" }}
        >
          A digital office manager for pet care businesses
        </h1>
        <p
          ref={subheadingRef}
          className="text-center font-light text-xl sm:text-2xl text-muted-foreground max-w-md mx-auto pt-8"
          style={{ willChange: "transform, opacity" }}
        >
          Mobile booking, invoicing, and client management software for the pet
          industry.
        </p>
        <div
          ref={buttonRef}
          className="text-center pt-8"
          style={{ willChange: "transform, opacity" }}
        >
          <Button
            className="w-full sm:w-auto !px-12"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            style={{ willChange: "transform" }}
          >
            Start for free
          </Button>
        </div>
      </div>
      <div className="flex justify-center w-[95%] h-auto absolute -bottom-20 left-1/2 transform -translate-x-1/2 pb-8">
        <div className="relative">
          <div ref={heroImageRef} style={{ willChange: "transform, opacity" }}>
            <Image
              src="/hero-home.svg"
              alt="Hero home illustration"
              width={1000}
              height={565}
              className="hidden md:block"
            />
          </div>
          <div className="relative md:absolute -bottom-[17rem] md:bottom-[35px] md:left-1/2 md:transform md:-translate-x-1/2 z-20 flex flex-col gap-4 items-center">
            <div
              ref={card1Ref}
              className="flex justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src="/hero-card-1.webp"
                alt="Hero card 1"
                width={250}
                height={120}
                className="rounded-lg"
              />
            </div>
            <div
              ref={card2Ref}
              className="flex justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src="/hero-card-2.webp"
                alt="Hero card 2"
                width={250}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>
          <div
            ref={phoneRef}
            className="relative flex justify-center md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10 mt-4 md:mt-0"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src="/hero-phone.svg"
              alt="Hero phone illustration"
              width={280}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
