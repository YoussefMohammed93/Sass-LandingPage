import Image from "next/image";

import { Button } from "./button";

export const HeroSection = () => {
  return (
    <section className="relative bg-background min-h-screen max-w-[1320px] mx-5 sm:mx-auto px-5 overflow-hidden rounded-br-[6rem] rounded-bl-[6rem]">
      <div className="relative z-10">
        <h1 className="max-w-5xl mx-auto text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground pt-28 font-ovo">
          A digital office manager for pet care businesses
        </h1>
        <p className="text-center font-light text-xl sm:text-2xl text-muted-foreground max-w-md mx-auto pt-8">
          Mobile booking, invoicing, and client management software for the pet
          industry.
        </p>
        <div className="text-center pt-8">
          <Button className="w-full sm:w-auto !px-12">Start for free</Button>
        </div>
      </div>
      <div className="flex justify-center w-[95%] h-auto absolute -bottom-20 left-1/2 transform -translate-x-1/2 pb-8">
        <div className="relative">
          <Image
            src="/hero-home.svg"
            alt="Hero home illustration"
            width={1000}
            height={565}
            className="hidden md:block"
          />
          <div className="relative md:absolute -bottom-[17rem] md:bottom-[35px] md:left-1/2 md:transform md:-translate-x-1/2 z-20 flex flex-col gap-4 items-center">
            <div className="flex justify-center">
              <Image
                src="/hero-card-1.webp"
                alt="Hero card 1"
                width={250}
                height={120}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/hero-card-2.webp"
                alt="Hero card 2"
                width={250}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="relative md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10 flex justify-center mt-4 md:mt-0">
            <Image
              src="/hero-phone.svg"
              alt="Hero phone illustration"
              width={280}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
