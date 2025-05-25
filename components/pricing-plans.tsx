"use client";

import Link from "next/link";

import { gsap } from "gsap";
import { Button } from "./button";
import { BiCheck } from "react-icons/bi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PricingPlans = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card1HeadingRef = useRef<HTMLHeadingElement>(null);
  const card2HeadingRef = useRef<HTMLHeadingElement>(null);
  const card2PriceRef = useRef<HTMLHeadingElement>(null);
  const card2DescRef = useRef<HTMLParagraphElement>(null);
  const card1FeaturesRef = useRef<HTMLDivElement[]>([]);
  const card1ButtonRef = useRef<HTMLDivElement>(null);
  const card2ButtonRef = useRef<HTMLDivElement>(null);

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
            card1Ref.current,
            card2Ref.current,
            card1HeadingRef.current,
            card2HeadingRef.current,
            card2PriceRef.current,
            card2DescRef.current,
            card1ButtonRef.current,
            card2ButtonRef.current,
            ...card1FeaturesRef.current,
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
                card1Ref.current,
                card2Ref.current,
                card1HeadingRef.current,
                card2HeadingRef.current,
                card2PriceRef.current,
                card2DescRef.current,
                card1ButtonRef.current,
                card2ButtonRef.current,
                ...card1FeaturesRef.current,
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
        gsap.set(card1Ref.current, {
          opacity: 0,
          x: mobile ? 0 : -120,
          y: mobile ? 80 : 60,
          scale: 0.9,
          rotationY: mobile ? 0 : -15,
          transformOrigin: "center center",
        });

        gsap.set(card2Ref.current, {
          opacity: 0,
          x: mobile ? 0 : 120,
          y: mobile ? 80 : 60,
          scale: 0.9,
          rotationY: mobile ? 0 : 15,
          transformOrigin: "center center",
        });

        gsap.set(card1HeadingRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationX: mobile ? 0 : 10,
        });

        gsap.set(card2HeadingRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationX: mobile ? 0 : 10,
        });

        gsap.set(card2PriceRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.7,
          rotationX: mobile ? 0 : 15,
        });

        gsap.set(card2DescRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.9,
        });

        gsap.set(card1FeaturesRef.current, {
          opacity: 0,
          x: mobile ? 0 : -40,
          y: 30,
          scale: 0.9,
          rotationY: mobile ? 0 : -5,
        });

        gsap.set([card1ButtonRef.current, card2ButtonRef.current], {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationX: mobile ? 0 : 10,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(card1Ref.current, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: animationConfig.slowDuration,
          ease: animationConfig.elasticEase,
        })
          .to(
            card2Ref.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: animationConfig.slowDuration,
              ease: animationConfig.elasticEase,
            },
            "-=1.2"
          )
          .to(
            card1HeadingRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
            },
            "-=1.0"
          )
          .to(
            card2HeadingRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
            },
            "-=0.9"
          )
          .to(
            card2PriceRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: animationConfig.duration,
              ease: animationConfig.elasticEase,
            },
            "-=0.7"
          )
          .to(
            card1FeaturesRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
              stagger: animationConfig.fastStagger,
            },
            "-=0.8"
          )
          .to(
            card2DescRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: animationConfig.duration,
              ease: animationConfig.ease,
            },
            "-=0.6"
          )
          .to(
            [card1ButtonRef.current, card2ButtonRef.current],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
              stagger: animationConfig.fastStagger,
            },
            "-=0.4"
          );

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
                    card1Ref.current,
                    card2Ref.current,
                    card1HeadingRef.current,
                    card2HeadingRef.current,
                    card2PriceRef.current,
                    card2DescRef.current,
                    card1ButtonRef.current,
                    card2ButtonRef.current,
                    ...card1FeaturesRef.current,
                  ],
                  {
                    y: 0,
                    x: 0,
                  }
                );
                return;
              }

              gsap.to([card1Ref.current, card2Ref.current], {
                y: progress * 60,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to([card1HeadingRef.current, card2HeadingRef.current], {
                y: progress * 40,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(card2PriceRef.current, {
                y: progress * 30,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to([card1ButtonRef.current, card2ButtonRef.current], {
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
      className="pb-20 sm:pb-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
    >
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12"
      >
        <div
          ref={card1Ref}
          className="p-12 sm:p-16 md:p-20 border-2 border-foreground rounded-[3rem] sm:rounded-[5rem] bg-white will-change-transform"
        >
          <h2
            ref={card1HeadingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
          >
            It&apos;s all free.
          </h2>
          <div className="flex flex-col gap-4 pt-8">
            <div
              ref={(el) => {
                if (el) card1FeaturesRef.current[0] = el;
              }}
              className="flex items-center gap-2 will-change-transform"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Up to 150 bookings per calendar month free
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) card1FeaturesRef.current[1] = el;
              }}
              className="flex items-center gap-2 will-change-transform"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Unlimited customers, pets, & invoices
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) card1FeaturesRef.current[2] = el;
              }}
              className="flex items-center gap-2 will-change-transform"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Unlimited employees
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) card1FeaturesRef.current[3] = el;
              }}
              className="flex items-center gap-2 will-change-transform"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Access to all Critter features
              </p>
            </div>
            <div
              ref={(el) => {
                if (el) card1FeaturesRef.current[4] = el;
              }}
              className="flex items-center gap-2 will-change-transform"
            >
              <span>
                <BiCheck className="check-icon size-8 text-primary" />
              </span>
              <p className="text-base sm:text-lg text-muted-foreground font-light">
                Access to white glove support and training
              </p>
            </div>
            <div ref={card1ButtonRef} className="pt-6 will-change-transform">
              <Link href="/pricing">
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
        </div>
        <div
          ref={card2Ref}
          className="p-16 sm:p-20 border-2 border-foreground rounded-[3rem] sm:rounded-[5rem] bg-white will-change-transform"
        >
          <h2
            ref={card2HeadingRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
          >
            Starts at:
          </h2>
          <h3
            ref={card2PriceRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl pt-12 font-ovo will-change-transform"
          >
            $0/mo
          </h3>
          <p
            ref={card2DescRef}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-light pt-12 will-change-transform"
          >
            Paid subscriptions start at $79 for 151-1000 monthly bookings and
            increase as you scale. With Critter, only pay as you grow.
          </p>
          <div ref={card2ButtonRef} className="pt-8 will-change-transform">
            <Link href="/pricing">
              <Button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                style={{ willChange: "transform" }}
              >
                Download the app
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
