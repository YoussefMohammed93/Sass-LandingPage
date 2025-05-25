"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { gsap } from "gsap";
import { GoArrowUp } from "react-icons/go";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollToTopButtonProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTopButton({
  threshold = 100,
  className,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonElementRef = useRef<HTMLButtonElement>(null);

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
      duration: prefersReducedMotion() ? 0.4 : 0.6,
      fastDuration: prefersReducedMotion() ? 0.05 : 0.4,
      ease: "power2.out",
      bounceEase: "back.out(1.2)",
      elasticEase: "elastic.out(0.8, 0.4)",
    }),
    [prefersReducedMotion]
  );

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        transformOrigin: "center center",
      });

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "top+=1 top",
        onUpdate: (self) => {
          if (self.progress === 0) {
            gsap.set(buttonRef.current, {
              y: 0,
            });
          }
        },
      });
    }, buttonRef);

    return () => ctx.revert();
  }, [getAnimationConfig, prefersReducedMotion]);

  useEffect(() => {
    const checkVisibilityAndFooterOverlap = () => {
      const scrollY = window.scrollY;

      const shouldBeVisible = scrollY > threshold;

      const footer = document.querySelector("footer");
      const button = buttonRef.current;

      let shouldBeOverFooter = false;

      if (footer && button) {
        const footerRect = footer.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        shouldBeOverFooter =
          footerRect.top < buttonRect.bottom &&
          footerRect.bottom > buttonRect.top;
      }

      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);

        if (!prefersReducedMotion() && buttonRef.current) {
          const config = getAnimationConfig();

          if (shouldBeVisible) {
            gsap.to(buttonRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: config.duration,
              ease: config.bounceEase,
            });
          } else {
            gsap.to(buttonRef.current, {
              opacity: 0,
              y: 20,
              scale: 0.8,
              duration: config.fastDuration,
              ease: config.ease,
            });
          }
        }
      }

      if (shouldBeOverFooter !== isOverFooter) {
        setIsOverFooter(shouldBeOverFooter);
      }
    };

    checkVisibilityAndFooterOverlap();
    window.addEventListener("scroll", checkVisibilityAndFooterOverlap);
    window.addEventListener("resize", checkVisibilityAndFooterOverlap);

    return () => {
      window.removeEventListener("scroll", checkVisibilityAndFooterOverlap);
      window.removeEventListener("resize", checkVisibilityAndFooterOverlap);
    };
  }, [
    threshold,
    isVisible,
    isOverFooter,
    prefersReducedMotion,
    getAnimationConfig,
  ]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
      scale: 1.1,
      x: deltaX,
      y: deltaY,
      rotation: rotation,
      boxShadow: isOverFooter
        ? "0 8px 25px rgba(0, 0, 0, 0.15)"
        : "0 8px 25px rgba(231, 88, 55, 0.3)",
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
      boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      duration: config.duration,
      ease: config.ease,
    });
  };

  return (
    <div
      ref={buttonRef}
      className={`fixed bottom-6 right-6 z-50 ${
        !isVisible ? "pointer-events-none" : ""
      } ${className || ""}`}
    >
      <button
        ref={buttonElementRef}
        onClick={scrollToTop}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        aria-label="Scroll to top"
        className={`
          rounded-full h-12 w-12
          flex items-center justify-center
          font-light border-0 cursor-pointer
          ${isOverFooter ? "bg-white text-primary" : "bg-primary text-white"}
        `}
      >
        <GoArrowUp className="size-6" />
      </button>
    </div>
  );
}
