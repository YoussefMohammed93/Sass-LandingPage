"use client";

import { gsap } from "gsap";
import { BiCheck } from "react-icons/bi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const FeaturesSoftware = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
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
          [headingRef.current, ...gridItemsRef.current.filter(Boolean)],
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

            gsap.to(gridItemsRef.current.filter(Boolean), {
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            });
          },
        });
      } else {
        gsap.set(headingRef.current, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          transformOrigin: "center center",
        });

        gsap.set(gridItemsRef.current.filter(Boolean), {
          opacity: 0,
          scale: 0.8,
          rotationY: mobile ? 0 : 15,
          rotationX: mobile ? 0 : 5,
          filter: "blur(6px)",
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
          scale: 1,
          filter: "blur(0px)",
          duration: animationConfig.slowDuration,
          ease: animationConfig.bounceEase,
        });

        const validItems = gridItemsRef.current.filter(Boolean);

        if (mobile) {
          validItems.forEach((item, index) => {
            if (item) {
              tl.to(
                item,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  rotationX: 0,
                  filter: "blur(0px)",
                  duration: animationConfig.duration * 1.3,
                  ease: "power3.out",
                },
                index === 0 ? "-=0.6" : `-=${animationConfig.duration * 0.4}`
              );
            }
          });
        } else {
          validItems.forEach((item, index) => {
            if (item) {
              const delay = index * animationConfig.stagger;
              tl.to(
                item,
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotationY: 0,
                  rotationX: 0,
                  filter: "blur(0px)",
                  duration: animationConfig.duration * 1.4,
                  ease: "back.out(1.2)",
                },
                `-=${animationConfig.slowDuration - delay}`
              );
            }
          });
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
                  [headingRef.current, ...gridItemsRef.current.filter(Boolean)],
                  {
                    y: 0,
                    x: 0,
                  }
                );
                return;
              }

              gsap.to(headingRef.current, {
                y: progress * 30,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(gridItemsRef.current.filter(Boolean), {
                y: progress * 50,
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
    <>
      <style jsx>{`
        .check-icon {
          will-change: transform;
        }
      `}</style>
      <section
        ref={sectionRef}
        className="py-20 sm:py-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
      >
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl will-change-transform"
        >
          Software designed for today&apos;s pet care
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-16 sm:pt-20"
        >
          <div className="flex flex-col items-start gap-5">
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[0] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Scheduling
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[1] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                In-app messaging
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[2] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Invoicing and payments
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[3] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Client portal
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[4] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Policy setting and enforcement
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[5] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Client management and onboarding
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[6] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Service report cards
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[7] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Employee management
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) gridItemsRef.current[8] = el;
              }}
              className="flex items-center gap-2"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Care history and tracking
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
