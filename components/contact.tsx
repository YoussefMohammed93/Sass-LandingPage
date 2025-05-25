"use client";

import { gsap } from "gsap";
import { Button } from "./button";
import { BiCheck } from "react-icons/bi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect, useCallback, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const formElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showToast, setShowToast] = useState(false);

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
      ease: "power2.out",
      bounceEase: "back.out(1.2)",
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

      gsap.set([headingRef.current, descriptionRef.current], {
        y: prefersReducedMotionValue ? 0 : 50,
        opacity: prefersReducedMotionValue ? 1 : 0,
      });

      gsap.set(featuresRef.current?.children || [], {
        y: prefersReducedMotionValue ? 0 : mobile ? 30 : 40,
        opacity: prefersReducedMotionValue ? 1 : 0,
      });

      gsap.set(formElementsRef.current.filter(Boolean), {
        y: prefersReducedMotionValue ? 0 : mobile ? 30 : 50,
        opacity: prefersReducedMotionValue ? 1 : 0,
      });

      gsap.set(buttonRef.current, {
        y: prefersReducedMotionValue ? 0 : 30,
        opacity: prefersReducedMotionValue ? 1 : 0,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          if (prefersReducedMotionValue) return;

          const tl = gsap.timeline();

          tl.to([headingRef.current, descriptionRef.current], {
            y: 0,
            opacity: 1,
            duration: animationConfig.duration,
            ease: animationConfig.ease,
            stagger: animationConfig.fastStagger,
          })
            .to(
              featuresRef.current?.children || [],
              {
                y: 0,
                opacity: 1,
                duration: animationConfig.fastDuration,
                ease: animationConfig.ease,
                stagger: animationConfig.fastStagger,
              },
              "-=0.3"
            )
            .to(
              formElementsRef.current.filter(Boolean),
              {
                y: 0,
                opacity: 1,
                duration: animationConfig.fastDuration,
                ease: animationConfig.ease,
                stagger: animationConfig.fastStagger,
              },
              "-=0.4"
            )
            .to(
              buttonRef.current,
              {
                y: 0,
                opacity: 1,
                duration: animationConfig.fastDuration,
                ease: animationConfig.bounceEase,
              },
              "-=0.2"
            );
        },
        onUpdate: (self) => {
          if (self.progress === 0 && !prefersReducedMotionValue) {
            gsap.set([headingRef.current, descriptionRef.current], {
              y: 0,
            });
            gsap.set(featuresRef.current?.children || [], {
              y: 0,
            });
            gsap.set(formElementsRef.current.filter(Boolean), {
              y: 0,
            });
            gsap.set(buttonRef.current, {
              y: 0,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [getAnimationConfig, prefersReducedMotion, isMobile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

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
      boxShadow: "0 8px 25px rgba(231, 88, 55, 0.3)",
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
    <>
      <section
        ref={sectionRef}
        className="py-24 md:py-32 lg:py-36 max-w-[1240px] px-5 xl:px-0 mx-auto"
      >
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          <div ref={contentRef}>
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-ovo mb-6 will-change-transform"
            >
              Contact us
            </h2>
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg font-light text-muted-foreground mb-8 will-change-transform"
            >
              Critter works hard to be available, accessible, and supportive
              when you need us. Reach out with whatever you need and we&apos;ll
              get back to you quickly :
            </p>
            <div ref={featuresRef} className="space-y-4">
              <div className="flex items-start gap-3 will-change-transform">
                <span className="flex-shrink-0 mt-1">
                  <BiCheck className="size-6 text-primary" />
                </span>
                <p className="text-base sm:text-lg font-light text-muted-foreground">
                  Request a product demo from the Critter team
                </p>
              </div>
              <div className="flex items-start gap-3 will-change-transform">
                <span className="flex-shrink-0 mt-1">
                  <BiCheck className="size-6 text-primary" />
                </span>
                <p className="text-base sm:text-lg font-light text-muted-foreground">
                  Ask a question about the platform or how something works
                </p>
              </div>
              <div className="flex items-start gap-3 will-change-transform">
                <span className="flex-shrink-0 mt-1">
                  <BiCheck className="size-6 text-primary" />
                </span>
                <p className="text-base sm:text-lg font-light text-muted-foreground">
                  Request a new feature or improvement
                </p>
              </div>
            </div>
          </div>
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                ref={(el) => {
                  if (el) formElementsRef.current[0] = el;
                }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-light text-foreground mb-2"
                >
                  What&apos;s your name? *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-foreground rounded-2xl bg-transparent focus:outline-none focus:border-primary transition-colors duration-200 font-light"
                />
              </div>
              <div
                ref={(el) => {
                  if (el) formElementsRef.current[1] = el;
                }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-light text-foreground mb-2"
                >
                  What&apos;s your email? *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-foreground rounded-2xl bg-transparent focus:outline-none focus:border-primary transition-colors duration-200 font-light"
                />
              </div>
              <div
                ref={(el) => {
                  if (el) formElementsRef.current[2] = el;
                }}
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-light text-foreground mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-foreground rounded-2xl bg-transparent focus:outline-none focus:border-primary transition-colors duration-200 font-light resize-none"
                />
              </div>
              <div ref={buttonRef}>
                <Button
                  type="submit"
                  className="w-full sm:w-auto !px-8"
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-white px-6 py-3 rounded-full shadow-lg animate-pulse">
          <p className="font-light">Message sent successfully!</p>
        </div>
      )}
    </>
  );
};
