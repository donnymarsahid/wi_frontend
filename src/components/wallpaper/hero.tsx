"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import CarouselBannerWallpaper from "../atoms/carouselbannerwallpaper";

export default function Hero() {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerWallpaper />
        </div>
      </div>
    </div>
  );
}
