"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBannerFlooring from "../atoms/carouselbannerflooring";
import { FlooringProps } from "@/types/flooring";

type HeroFlooringProps = {
  flooring: FlooringProps;
};

export default function Hero({ flooring }: HeroFlooringProps) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerFlooring flooring={flooring} />
        </div>
      </div>
    </div>
  );
}
