"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";

export default function CallculatorWallpaper() {
  return (
    <>
      <div className="mt-6 mb-4">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4 flex justify-between items-center">
            <div className="w-[49%] bg-[#F5F5F5] h-[100px] px-6 flex items-center border-2 border-[#10D3A2] rounded-lg">
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
            </div>
            <div className="w-[49%] bg-[#F5F5F5] h-[100px] px-6 flex items-center border-2 border-[#10D3A2] rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
