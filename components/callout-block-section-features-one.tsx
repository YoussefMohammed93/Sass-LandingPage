"use client";

import Link from "next/link";

import { gsap } from "gsap";
import { Button } from "./button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CalloutBlockSectionFeaturesOne = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const paragraphWordsRef = useRef<HTMLSpanElement[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const isMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  const getAnimationConfig = useCallback(
    () => ({
      duration: prefersReducedMotion() ? 0.1 : 0.8,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.4,
      slowDuration: prefersReducedMotion() ? 0.15 : 1.2,
      textDuration: prefersReducedMotion() ? 0.1 : 1.4,
      ease: "power3.out",
      bounceEase: "back.out(1.7)",
      elasticEase: "elastic.out(1, 0.3)",
      textEase: "power2.out",
      stagger: prefersReducedMotion() ? 0.02 : 0.15,
      fastStagger: prefersReducedMotion() ? 0.01 : 0.08,
      wordStagger: prefersReducedMotion() ? 0.01 : 0.03,
    }),
    [prefersReducedMotion]
  );

  const splitTextIntoWords = useCallback((element: HTMLElement) => {
    if (!element) return [];

    const text = element.textContent || "";
    const words = text.split(/(\s+)/);

    element.innerHTML = "";

    const wordElements: HTMLSpanElement[] = [];

    words.forEach((word) => {
      if (word.trim()) {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity, filter";
        span.className = "word-span";
        element.appendChild(span);
        wordElements.push(span);
      } else {
        element.appendChild(document.createTextNode(word));
      }
    });

    return wordElements;
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animationConfig = getAnimationConfig();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      let wordElements: HTMLSpanElement[] = [];
      if (paragraphRef.current && !prefersReducedMotion) {
        wordElements = splitTextIntoWords(paragraphRef.current);
        paragraphWordsRef.current = wordElements;
      }

      if (prefersReducedMotion) {
        gsap.set(
          [
            containerRef.current,
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
                containerRef.current,
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

        gsap.set(containerRef.current, {
          opacity: 0,
          scale: 0.95,
          y: 40,
          transformOrigin: "center center",
        });

        gsap.set(headingRef.current, {
          opacity: 0,
          y: 60,
          rotationX: mobile ? 0 : 15,
          transformOrigin: "center center",
        });

        if (wordElements.length > 0) {
          gsap.set(wordElements, {
            opacity: 0,
            y: 30,
            rotationX: mobile ? 0 : 10,
            scale: 0.8,
            filter: "blur(8px)",
            transformOrigin: "center bottom",
          });
        } else {
          gsap.set(paragraphRef.current, {
            opacity: 0,
            y: 40,
          });
        }

        gsap.set(buttonRef.current, {
          opacity: 0,
          y: 30,
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
              y: 0,
              rotationX: 0,
              duration: animationConfig.duration,
              ease: animationConfig.elasticEase,
            },
            "-=0.8"
          )
          .to(
            wordElements.length > 0 ? wordElements : paragraphRef.current,
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              filter: "blur(0px)",
              duration:
                wordElements.length > 0
                  ? animationConfig.textDuration
                  : animationConfig.duration,
              ease:
                wordElements.length > 0
                  ? animationConfig.textEase
                  : "power2.out",
              stagger:
                wordElements.length > 0
                  ? {
                      amount: animationConfig.wordStagger * wordElements.length,
                      from: "start",
                      ease: "power2.out",
                    }
                  : 0,
            },
            "-=0.5"
          )
          .to(
            buttonRef.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: animationConfig.duration,
              ease: animationConfig.bounceEase,
            },
            "-=0.3"
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
                    containerRef.current,
                    headingRef.current,
                    buttonRef.current,
                  ].filter(Boolean),
                  {
                    y: 0,
                  }
                );

                if (wordElements.length > 0) {
                  gsap.set(wordElements, { y: 0 });
                } else {
                  gsap.set(paragraphRef.current, { y: 0 });
                }
                return;
              }

              gsap.to(containerRef.current, {
                y: progress * 60,
                duration: 0.3,
                ease: "sine.out",
              });

              gsap.to(headingRef.current, {
                y: progress * 40,
                duration: 0.3,
                ease: "sine.out",
              });

              if (wordElements.length > 0) {
                gsap.to(wordElements, {
                  y: progress * 25,
                  duration: 0.3,
                  ease: "sine.out",
                  stagger: {
                    amount: 0.1,
                    from: "start",
                  },
                });
              } else {
                gsap.to(paragraphRef.current, {
                  y: progress * 30,
                  duration: 0.3,
                  ease: "sine.out",
                });
              }

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
  }, [getAnimationConfig, isMobile, splitTextIntoWords]);

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
    <>
      <style jsx>{`
        .word-span {
          transition: color 0.3s ease;
        }
        .word-span:hover {
          color: var(--primary);
        }
        @media (prefers-reduced-motion: reduce) {
          .word-span {
            transition: none;
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="py-20 sm:py-24 max-w-[1240px] px-5 xl:px-0 mx-auto"
      >
        <div
          ref={containerRef}
          className="bg-background text-center p-8 sm:p-14 md:p-20 rounded-[3rem] sm:rounded-[5rem] will-change-transform"
        >
          <div className="max-w-4xl mx-auto">
            <h1
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo will-change-transform"
            >
              Improve customer experience with a mobile client portal
            </h1>
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg font-light text-muted-foreground pt-8 will-change-transform"
              style={{
                lineHeight: "1.7",
                letterSpacing: "0.01em",
              }}
            >
              Deliver the client experience your customers deserve with modern
              technology designed to make their lives easier. Let your customers
              request bookings, pay invoices, review service reports, and access
              photos and videos that add the little touches that make your
              business stand out.
            </p>
            <div ref={buttonRef} className="pt-8 will-change-transform">
              <Link href="/pricing">
                <Button
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  style={{ willChange: "transform" }}
                >
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
