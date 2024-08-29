"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import Link from "next/link";

export default function WallpaperByColor() {
  const wallpapers = [
    {
      url: "/assets/dummy/wp-style-1.png",
      title: "Wallpaper",
    },
    {
      url: "/assets/dummy/wp-style-2.png",
      title: "Lantai Vinyl & SPC",
    },
    {
      url: "/assets/dummy/wp-style-1.png",
      title: "Wallpanel",
    },
    {
      url: "/assets/dummy/wp-style-2.png",
      title: "Karpet & Rumput Sintetis",
    },
    {
      url: "/assets/dummy/wp-style-1.png",
      title: "Wallpaper",
    },
    {
      url: "/assets/dummy/wp-style-2.png",
      title: "Lantai Vinyl & SPC",
    },
    {
      url: "/assets/dummy/wp-style-1.png",
      title: "Wallpanel",
    },
    {
      url: "/assets/dummy/wp-style-2.png",
      title: "Karpet & Rumput Sintetis",
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-start flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Wallpaper by Color
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div>
                <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
                  {wallpapers.map((item, index) => (
                    <Link href={""}>
                      <div
                        key={index}
                        className="relative mt-4 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={item.url}
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
                            <h3 className="p-2 bg-white bg-opacity-75 border-[2px] rounded-lg border-[#44CBEB] lg:text-[16px] text-[10px] text-center">
                              {item.title}
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
