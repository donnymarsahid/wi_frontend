"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import Link from "next/link";

type WallpaperPageProps = {
  data: any;
};

export default function Floors({ data }: WallpaperPageProps) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className=" ">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                {data.title}
              </h1>
              <div className="md:h-[3px] h-[1px] w-[270px] bg-[#20D3B6] text-center"></div>
              <div>
                <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                  {data.floors.map((item: any, index: any) => (
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
                          <div className="bg-white">
                            <h3 className="font-bold lucida-bright p-2 border-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-center">
                              {item.title}
                            </h3>
                            <div
                              className={`${cx(
                                poppins,
                                poppins.className
                              )} flex justify-between items-center p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
                            >
                              <div className="md:text-xs text-[9px] text-[#474747]">
                                <p>Ukuran</p>
                                <p>Lebar: 1.06 meter</p>
                                <p>Panjang: 1.06 meter</p>
                              </div>
                              <div className="md:text-sm text-[10px] font-semibold flex items-center flex-col text-white bg-[#FF0000] lg:px-4 lg:py-3 px-2 py-1 rounded-full lucida-bright">
                                <p className="uppercase">Disc</p>
                                <p>50%</p>
                              </div>
                            </div>
                            <div
                              className={`${cx(
                                poppins,
                                poppins.className
                              )} flex justify-between items-center p-2 border-b-[1px] border-l-[1px] border-r-[1px] border-[#A5A5A5]`}
                            >
                              <div className="text-sm">
                                <div>
                                  <p className="text-[#FF0000] line-through md:text-lg text-[9.5px]">
                                    Rp. 600.000
                                  </p>
                                </div>
                              </div>
                              <div className="text-sm">
                                <div>
                                  <p className="md:text-lg text-[9.5px] font-medium text-[#474747]">
                                    Rp. 300.000 / Roll
                                  </p>
                                </div>
                              </div>
                            </div>
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
