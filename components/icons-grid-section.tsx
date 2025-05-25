"use client";

import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const IconsGridSection = () => {
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
        gsap.set([headingRef.current, ...gridItemsRef.current], {
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(headingRef.current, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            });

            gsap.to(gridItemsRef.current, {
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
          y: 50,
          rotationX: mobile ? 0 : 15,
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
        });

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
                gsap.set([headingRef.current, ...gridItemsRef.current], {
                  y: 0,
                  x: 0,
                });
                return;
              }

              gsap.to(headingRef.current, {
                y: progress * 40,
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

  const handleGridItemHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;

    const item = e.currentTarget;
    const config = getAnimationConfig();

    gsap.to(item, {
      scale: 1.05,
      y: -8,
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
      duration: config.fastDuration,
      ease: config.bounceEase,
    });
  };

  const handleGridItemLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;

    const item = e.currentTarget;
    const config = getAnimationConfig();

    gsap.to(item, {
      scale: 1,
      y: 0,
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      duration: config.fastDuration,
      ease: config.ease,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
    >
      <h2
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
      >
        Mobile tools for the <br className="hidden sm:block" />{" "}
        not-behind-a-desk professional
      </h2>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 pt-16 sm:pt-20"
      >
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[0] = el;
          }}
          className="flex flex-col items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border-2 border-foreground cursor-pointer transition-colors duration-200 hover:bg-primary/5 will-change-transform"
          onMouseEnter={handleGridItemHover}
          onMouseLeave={handleGridItemLeave}
        >
          <Image
            width={100}
            height={100}
            src="/icon-grid-1.svg"
            alt="Icon 1"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className="text-lg font-light text-muted-foreground text-center">
            Walking and drop-ins
          </h3>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[1] = el;
          }}
          className="flex flex-col items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border-2 border-foreground cursor-pointer transition-colors duration-200 hover:bg-primary/5 will-change-transform"
          onMouseEnter={handleGridItemHover}
          onMouseLeave={handleGridItemLeave}
        >
          <Image
            width={100}
            height={100}
            src="/icon-grid-2.svg"
            alt="Icon 2"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className="text-lg font-light text-muted-foreground text-center">
            Pet sitting
          </h3>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[2] = el;
          }}
          className="flex flex-col items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border-2 border-foreground cursor-pointer transition-colors duration-200 hover:bg-primary/5 will-change-transform"
          onMouseEnter={handleGridItemHover}
          onMouseLeave={handleGridItemLeave}
        >
          <Image
            width={100}
            height={100}
            src="/icon-grid-3.svg"
            alt="Icon 3"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className="text-lg font-light text-muted-foreground text-center">
            In-home boarding
          </h3>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[3] = el;
          }}
          className="flex flex-col items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border-2 border-foreground cursor-pointer transition-colors duration-200 hover:bg-primary/5 will-change-transform"
          onMouseEnter={handleGridItemHover}
          onMouseLeave={handleGridItemLeave}
        >
          <Image
            width={100}
            height={100}
            src="/icon-grid-4.svg"
            alt="Icon 4"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className="text-lg font-light text-muted-foreground text-center">
            Training
          </h3>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[4] = el;
          }}
          className="flex flex-col items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-3xl border-2 border-foreground cursor-pointer transition-colors duration-200 hover:bg-primary/5 will-change-transform"
          onMouseEnter={handleGridItemHover}
          onMouseLeave={handleGridItemLeave}
        >
          <Image
            width={100}
            height={100}
            src="/icon-grid-5.svg"
            alt="Icon 5"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h3 className="text-lg font-light text-muted-foreground text-center">
            Grooming
          </h3>
        </div>
      </div>
    </section>
  );
};
