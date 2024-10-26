"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { CategoryProps } from "@/types/categories";
import { STRAPI_URL } from "@/app/utils/constans";

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
                <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 grid-cols-3">
                  {categories.data[0].attributes.sub_categories.data
                    .sort(
                      (a, b) =>
                        new Date(b.attributes.date).getTime() -
                        new Date(a.attributes.date).getTime()
                    )
                    .map((item, index) => (
                      <Link href={""} className="mt-2" key={index}>
                        <div
                          key={index}
                          className="relative mt-4 overflow-hidden cursor-pointer rounded-lg md:h-[98px] h-[60px]"
                        >
                          <Image
                            src={`${STRAPI_URL}${item.attributes?.thumbnail?.data?.attributes.url}`}
                            width={400}
                            height={400}
                            alt="wall"
                            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110 rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="w-full">
                            <div
                              className={`relative md:mt-[-69px] mt-[-48px] flex justify-center ${cx(
                                poppins,
                                poppins.className
                              )}`}
                            >
                              <h3 className="p-2 bg-white bg-opacity-75 border-[2px] rounded-lg border-[#44CBEB] lg:text-[16px] text-[10px] text-center">
                                {item.attributes.name.replace("Lantai", "")}
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
