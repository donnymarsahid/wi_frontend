"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import CarouselBannerWallpaper from "../atoms/carouselbannerwallpaper";
import { WallpaperProps } from "@/types/wallpaper";

type HeroWallpaperProps = {
  wallpaper: WallpaperProps;
};

export default function Hero({ wallpaper }: HeroWallpaperProps) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerWallpaper wallpaper={wallpaper} />
        </div>
      </div>
    </div>
  );
}
