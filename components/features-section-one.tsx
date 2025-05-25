import Image from "next/image";

import { Button } from "./button";

export const FeaturesSectionOne = () => {
  return (
    <section className="py-20 sm:py-24 max-w-[1320px] px-5 xl:px-0 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-14 sm:gap-8">
        <div className="order-2 md:order-1">
          <Image
            src="/client-home.jpg"
            alt="Home Feature"
            width={500}
            height={500}
            className="rounded-[3rem] sm:rounded-[5rem]"
          />
        </div>
        <div className="sm:max-w-xl mx-auto order-1 md:order-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ovo">
            Tools to launch, run, and grow a pet care business
          </h2>
          <p className="text-base sm:text-lg font-light text-muted-foreground pt-8">
            Reduce admin time, get organized, & deliver the best possible
            service every time with Critter&apos;s all in one mobile platform.
          </p>
          <div className="pt-8">
            <Button>Learn more</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
