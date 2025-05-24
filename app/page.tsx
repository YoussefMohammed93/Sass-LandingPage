"use client";

import gsap from "gsap";

import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    gsap.to(".box-1", {
      duration: 2,
      x: 1000,
      ease: "power1.in",
      rotate: 360,
    });
    gsap.to(".box-2", {
      duration: 2,
      x: 1000,
      ease: "power2.in",
      delay: 0.1,
      scale: 0.5,
    });
    gsap.to(".box-3", {
      duration: 2,
      x: 1000,
      ease: "power3.in",
      delay: 0.2,
      borderRadius: "50%",
    });
  }, []);

  return (
    <main className="w-full">
      <div className="box-1 w-[200px] h-[200px] bg-sky-500"></div>
      <div className="box-2 w-[200px] h-[200px] bg-purple-500"></div>
      <div className="box-3 w-[200px] h-[200px] bg-orange-500"></div>
    </main>
  );
}
