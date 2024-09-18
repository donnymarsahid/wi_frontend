"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBannerFlooring from "../atoms/carouselbannerflooring";
import { FlooringProps } from "@/types/flooring";
import { CategoryProps } from "@/types/categories";

type HeroCategoryProps = {
  categories: CategoryProps;
};

export default function HeroOthers({ categories }: HeroCategoryProps) {
  return (
    <div>
      <div className="container mx-auto mt-[120px] md:mt-[150px] lg:mt-[0px]">
        <div className="md:mx-10 mx-4">
          <CarouselBannerFlooring categories={categories} />
        </div>
      </div>
    </div>
  );
}
