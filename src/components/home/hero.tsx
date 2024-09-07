"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import { HomepageProps } from "@/types/homepage";

type HeroHomeProps = {
  homepage: HomepageProps;
};

export default function Hero({ homepage }: HeroHomeProps) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBanner homepage={homepage} />
        </div>
      </div>
    </div>
  );
}
