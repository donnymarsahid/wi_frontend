"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";
import { HomepageProps } from "@/types/homepage";
import { WallpaperProps } from "@/types/wallpaper";

type CallculatorWallpaperSectionProps = {
  wallpaper: WallpaperProps;
};
export default function CallculatorWallpaper({
  wallpaper,
}: CallculatorWallpaperSectionProps) {
  return (
    <>
      <div className="mt-10 mb-4">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4 flex justify-between items-center md:flex-row flex-col">
            <Link
              href={`/calculatorWallpaper`}
              className="md:w-[49%] w-full bg-[#F5F5F5] h-[100px] px-6 flex items-center border-2 border-[#10D3A2] rounded-lg scale-100 hover:scale-105 transition duration-2"
            >
              <Image
                src="/assets/icons/calc.svg"
                width={50}
                height={50}
                alt="wp"
              />
              <div className="ms-2">
                <h1 className="lucida-bright text-lg">Kalkulator Wallpaper</h1>
                <p className={`${cx(poppins, poppins.className)} text-xs`}>
                  Untuk menghitung kebutuhan wallpaper dindingmu
                </p>
              </div>
            </Link>
            <Link
              href={wallpaper.data.attributes.youtubeChannel}
              target="blank"
              className="md:w-[49%] w-full md:mt-0 mt-2 bg-[#F5F5F5] h-[100px] px-6 flex items-center border-2 border-[#10D3A2] rounded-lg scale-100 hover:scale-105 transition duration-2"
            >
              <Image
                src="/assets/icons/yt.png"
                width={70}
                height={70}
                alt="wp"
              />
              <div className="ms-2">
                <h1 className="lucida-bright text-lg">Youtube</h1>
                <p className={`${cx(poppins, poppins.className)} text-xs`}>
                  Temukan video pemasangan & review produk disini
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
