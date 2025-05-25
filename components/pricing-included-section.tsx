"use client";

import Image from "next/image";

import { gsap } from "gsap";
import { BiCheck } from "react-icons/bi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PricingIncludedSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridItemsRef = useRef<HTMLDivElement[]>([]);

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
      slowDuration: prefersReducedMotion() ? 0.15 : 1.2,
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
      const prefersReducedMotionValue = prefersReducedMotion();
      const mobile = isMobile();

      if (prefersReducedMotionValue) {
        gsap.set(
          [headingRef.current, paragraphRef.current, ...gridItemsRef.current],
          {
            opacity: 0,
          }
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(headingRef.current, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(paragraphRef.current, {
              opacity: 1,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
            });

            gsap.to(gridItemsRef.current, {
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.4,
              ease: "power2.out",
            });
          },
        });
      } else {
        gsap.set(headingRef.current, {
          opacity: 0,
          y: 50,
          rotationX: mobile ? 0 : 15,
          transformOrigin: "center center",
        });

        gsap.set(paragraphRef.current, {
          opacity: 0,
          y: 30,
          x: mobile ? 0 : -50,
          scale: 0.95,
          rotationY: mobile ? 0 : 5,
          transformOrigin: "center center",
        });

        gsap.set(gridItemsRef.current, {
          opacity: 0,
          x: -200,
          y: 20,
          scale: 0.9,
          rotationY: mobile ? 0 : 8,
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: animationConfig.slowDuration,
          ease: animationConfig.bounceEase,
        }).to(
          paragraphRef.current,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: animationConfig.duration * 1.1,
            ease: "power3.out",
          },
          "-=0.6"
        );

        if (mobile) {
          for (let i = 0; i < gridItemsRef.current.length; i++) {
            const item = gridItemsRef.current[i];

            if (item) {
              tl.to(
                item,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  duration: animationConfig.duration * 1.2,
                  ease: "power2.out",
                },
                i === 0 ? "-=0.4" : `-=${animationConfig.duration * 0.3}`
              );
            }
          }
        } else {
          for (let i = gridItemsRef.current.length - 1; i >= 0; i--) {
            const item = gridItemsRef.current[i];
            const reverseIndex = gridItemsRef.current.length - 1 - i;

            if (item) {
              tl.to(
                item,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  duration: animationConfig.duration * 1.2,
                  ease: "power2.out",
                },
                reverseIndex === 0
                  ? "-=0.4"
                  : `-=${animationConfig.duration * 0.3}`
              );
            }
          }
        }

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
                    paragraphRef.current,
                    ...gridItemsRef.current,
                  ],
                  {
                    y: 0,
                    x: 0,
                  }
                );
                return;
              }

              gsap.to(headingRef.current, {
                y: progress * 40,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(paragraphRef.current, {
                y: progress * 50,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(gridItemsRef.current, {
                y: progress * 60,
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

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
    >
      <h2
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
      >
        What&apos;s included?
      </h2>
      <p
        ref={paragraphRef}
        className="text-base sm:text-lg font-light text-muted-foreground pt-8 will-change-transform"
      >
        Access the full Critter platform for less than the cost of one service
        per month.
      </p>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 pt-16 sm:pt-20"
      >
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[0] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <div>
            <Image src="/scheduling.svg" alt="Icon 1" width={80} height={80} />
          </div>
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Scheduling
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Calendar management
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Meet and Greets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Service history
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Employee management
              </p>
            </div>
          </div>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[1] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <div>
            <Image src="/invoicing.svg" alt="Icon 2" width={80} height={80} />
          </div>
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Streamlined invoicing
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Flexible invoicing
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                In-app payments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Stripe integration
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Automation
              </p>
            </div>
          </div>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[2] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <div>
            <Image src="/mangement.svg" alt="Icon 3" width={80} height={80} />
          </div>
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Client management
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Onboarding workflow
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                In-app communications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Policy and record management
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Care plan and instructions
              </p>
            </div>
          </div>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[3] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <div>
            <Image src="/hearts.svg" alt="Icon 4" width={80} height={80} />
          </div>
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Communications
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                White glove support
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Phone, email, & video access
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Hands-on training
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Onboarding support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
