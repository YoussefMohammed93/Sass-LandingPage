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

export const FeaturesSectionTwo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isMobile = useCallback(() => {
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  const getAnimationConfig = useCallback(
    () => ({
      duration: prefersReducedMotion() ? 0.1 : 0.8,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.4,
      slowDuration: prefersReducedMotion() ? 0.15 : 1.4,
      ease: "power3.out",
      bounceEase: "back.out(1.7)",
      elasticEase: "elastic.out(1, 0.3)",
      stagger: prefersReducedMotion() ? 0.02 : 0.12,
      fastStagger: prefersReducedMotion() ? 0.01 : 0.06,
    }),
    [prefersReducedMotion]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animationConfig = getAnimationConfig();
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
        const mobile = isMobile();

        gsap.set(imageRef.current, {
          opacity: 0,
          x: mobile ? 0 : 150,
          y: mobile ? -100 : 0,
          scale: 0.7,
          rotation: mobile ? 0 : 8,
          borderRadius: "20%",
          transformOrigin: "center center",
        });

        gsap.set(headingRef.current, {
          opacity: 0,
          x: -100,
          rotationY: mobile ? 0 : -25,
          transformOrigin: "left center",
        });

        gsap.set(paragraphRef.current, {
          opacity: 0,
          x: -80,
          skewX: mobile ? 0 : -5,
        });

        gsap.set(buttonRef.current, {
          opacity: 0,
          x: -60,
          scale: 0.8,
          rotationZ: mobile ? 0 : -10,
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
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          borderRadius: "3rem",
          duration: animationConfig.slowDuration,
          ease: animationConfig.elasticEase,
        })
          .to(
            headingRef.current,
            {
              opacity: 1,
              x: 0,
              rotationY: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
            },
            "-=0.8"
          )
          .to(
            paragraphRef.current,
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: animationConfig.duration,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(
            buttonRef.current,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationZ: 0,
              duration: animationConfig.duration,
              ease: animationConfig.elasticEase,
            },
            "-=0.3"
          );

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
                  imageRef.current,
                  headingRef.current,
                  paragraphRef.current,
                  buttonRef.current,
                ],
                {
                  y: 0,
                  x: mobile ? 0 : 0,
                }
              );
              return;
            }

            gsap.to(imageRef.current, {
              y: mobile ? progress * 80 : progress * 120,
              x: mobile ? 0 : progress * 20,
              rotation: mobile ? 0 : progress * 5,
              duration: 0.3,
              ease: "sine.out",
            });

            gsap.to(headingRef.current, {
              y: progress * 80,
              x: progress * -20,
              duration: 0.3,
              ease: "sine.out",
            });

            gsap.to(paragraphRef.current, {
              y: progress * 60,
              duration: 0.3,
              ease: "sine.out",
            });

            gsap.to(buttonRef.current, {
              y: progress * 40,
              duration: 0.3,
              ease: "sine.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [getAnimationConfig, isMobile]);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return;

    const mobile = isMobile();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const relativeX = (mouseX - centerX) / (rect.width / 2);
    const relativeY = (mouseY - centerY) / (rect.height / 2);

    const rotation = mobile ? 0 : relativeX * 3;

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
        <div ref={textContainerRef} className="mx-auto">
          <h2
            ref={headingRef}
            className="sm:max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
          >
            Easy scheduling and client coordination
          </h2>
          <p
            ref={paragraphRef}
            className="sm:max-w-lg text-base sm:text-lg font-light text-muted-foreground pt-8 will-change-transform"
          >
            Make managing your business calendar simple with tools for
            streamlined scheduling and convenient communication, so customers
            and staff always have the information they need at their fingertips.
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
        <div
          ref={imageRef}
          className="order-2 md:order-1 will-change-transform"
        >
          <Image
            src="/features-two.svg"
            alt="Easy scheduling and client coordination feature"
            width={400}
            height={400}
            className="rounded-[3rem] sm:rounded-[5rem] w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
