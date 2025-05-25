import Link from "next/link";
import Image from "next/image";

import { Button } from "./button";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-5 sm:mb-12">
          <div className="sm:col-span-7 lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-ovo text-white">
              Get started in seconds
            </h2>
          </div>
          <div className="sm:col-span-5 lg:col-span-4 flex flex-col sm:flex-row-reverse gap-4">
            <Button variant="secondary">Start for free</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-12">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div>
              <Image
                src="/mobile-logo.svg"
                alt="Critter Care Logo"
                className="h-10 w-auto"
                width={54}
                height={40}
              />
            </div>
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/features"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-white hover:text-white/80 transition-colors duration-200"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="text-center sm:text-right pt-10 sm:pt-0">
            <p className="text-white text-sm">© 2025 Critter Care, Inc</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
