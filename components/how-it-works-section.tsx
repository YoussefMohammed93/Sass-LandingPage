"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HowItWorksSection = () => {
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
          y: 40,
          x: mobile ? 0 : -60,
          scale: 0.94,
          rotationY: mobile ? 0 : 6,
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
            duration: animationConfig.duration * 1.15,
            ease: "power3.out",
          },
          "-=0.7"
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
                y: progress * 55,
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
        How it works?
      </h2>
      <p
        ref={paragraphRef}
        className="max-w-4xl text-base sm:text-lg font-light text-muted-foreground pt-8 will-change-transform"
      >
        Our pricing structure makes it easy to try Critter, no commitment
        required. Download the mobile app, set up your business account for
        free, and access the full set of features we offer. See how Critter can
        make a difference for your business. Only pay once you cross 150
        bookings per calendar month in the app.
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
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Download Critter
          </h3>
          <p className="text-base sm:text-lg font-light text-muted-foreground">
            Available for free on iOS and Android, download the Critter mobile
            app today and set up a free professional account to start your free
            trial.
          </p>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[1] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Test the platform
          </h3>
          <p className="text-base sm:text-lg font-light text-muted-foreground">
            Use the features that matter to you most for as long as you need.
            Get a feel for how the platform delivers the best results for you
            and your business.
          </p>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[2] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Ask questions
          </h3>
          <p className="text-base sm:text-lg font-light text-muted-foreground">
            The Critter team is here to help. We&apos;ll answer questions, help
            onboard, and provide ongoing hands-on support so you&apos;re always
            running at full speed.
          </p>
        </div>
        <div
          ref={(el) => {
            if (el) gridItemsRef.current[3] = el;
          }}
          className="flex flex-col items-start gap-4 sm:gap-5"
        >
          <h3 className="text-xl md:text-2xl font-light text-foreground">
            Build your business
          </h3>
          <p className="text-base sm:text-lg font-light text-muted-foreground">
            Onboard your customers. Fill your schedule. Collect payment. Grow
            your business with software that makes your life easier every step
            of the way.
          </p>
        </div>
      </div>
    </section>
  );
};
