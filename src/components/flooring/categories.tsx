"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { CategoryProps } from "@/types/categories";
import { STRAPI_URL } from "@/app/utils/constans";
import CarouselCategoriesSlider from "../atoms/carouselcategoriesslider";

type HeroCategoryProps = {
  categories: CategoryProps;
};

export default function CategoriesFlooring({ categories }: HeroCategoryProps) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div>
              <div>
                <div>
                  <CarouselCategoriesSlider categories={categories} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
