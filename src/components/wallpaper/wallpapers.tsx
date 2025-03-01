"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import Link from "next/link";
import { SubCategoryPropsDaum } from "@/types/subCategories";
import { STRAPI_URL } from "@/app/utils/constans";
import { Daum5 } from "@/types/categories";
import { WallpaperByGeneralProps } from "@/types/wallpaperByGeneral";
import { convertToSlug } from "@/lib/utils";

type WallpaperPageProps = {
  titleKey: string;
  data: WallpaperByGeneralProps;
};

export default function Wallpapers({ titleKey, data }: WallpaperPageProps) {
  // const filteredData = data.data.filter((itemData) => {
  //   const product = itemData?.attributes?.products?.data[0];
  //   const brand = product?.attributes?.brands?.data[0];
  //   const subCategory = brand?.attributes?.sub_categories?.data[0];
  //   const category = subCategory?.attributes?.categories?.data[0];
  //   return category?.attributes?.keyPageCondition === "wallpaper";
  // });
  const filteredData = data.data;

  return (
    <>
      <div className="mt-24">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-start flex-col">
              <button className="lg:text-[35px] md:text-[28px] lucida-bright bg-[#10D3A2] px-4 py-1 text-white rounded-lg shadow-lg cursor-default">
                {titleKey}
              </button>
              <div>
                <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                  {filteredData.map((item, index) => (
                    <Link
                      href={`/products?styleFilter=${
                        item.attributes.slug
                      }--${convertToSlug(titleKey)}`}
                      key={index}
                    >
                      <div className="relative mt-4 overflow-hidden cursor-pointer">
                        <Image
                          src={`${STRAPI_URL}${item.attributes.thumbnail?.data?.attributes?.url}`}
                          width={400}
                          height={400}
                          alt="wall"
                          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div>
                        <div className="w-full">
                          <div
                            className={`relative mt-[-60px] flex justify-center ${cx(
                              poppins,
                              poppins.className
                            )}`}
                          >
                            <h3 className="p-2 bg-white bg-opacity-75   rounded-lg   lg:text-[16px] text-[10px] text-center shadow-lg">
                              {item.attributes.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
