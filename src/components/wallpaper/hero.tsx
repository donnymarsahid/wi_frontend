"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import CarouselBannerWallpaper from "../atoms/carouselbannerwallpaper";
import { WallpaperProps } from "@/types/wallpaper";
import { CategoryProps } from "@/types/categories";

type HeroCategoryProps = {
  categories: CategoryProps;
};

export default function Hero({ categories }: HeroCategoryProps) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerWallpaper categories={categories} />
        </div>
      </div>
    </div>
  );
}
