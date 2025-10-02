"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";
import Link from "next/link";
import { Daum5 } from "@/types/categories";
import { STRAPI_URL } from "@/app/utils/constans";
import {
  calculateDiscount,
  formatNumberToLetter,
  formatRupiah,
} from "@/app/lib/utils";
import CardProduct from "../atoms/cardProduct";

type WallpaperPageProps = {
  data: Daum5;
  keyPage: string;
};

export default function Floors({ data, keyPage }: WallpaperPageProps) {
  return (
    <>
      {data.attributes.name.toLowerCase().includes("accessories") ? (
        <>
          {data.attributes?.description ? (
            <>
              <div
                className="md:mt-20 mt-8 md:scroll-mt-[125px] scroll-mt-[190px]"
                id={data.attributes.name}
              >
                <div className="container mx-auto">
                  <div className="md:mx-10 mx-4">
                    <div className=" ">
                      <h1 className="lg:text-[35px] md:text-[28px] lucida-bright cursor-default">
                        {data.attributes.name}
                      </h1>
                      <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#10D3A2]"></div>
                      <p
                        className={`md:text-base text-[10px] ${cx(
                          poppins,
                          poppins.className
                        )}`}
                      >
                        {data.attributes.description}
                      </p>

                      <div>
                        <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                          {data.attributes.brands?.data.length &&
                            data.attributes.brands?.data
                              .sort(
                                (a, b) =>
                                  new Date(b.attributes.date).getTime() -
                                  new Date(a.attributes.date).getTime()
                              )
                              .map((item, index) => (
                                <Link
                                  href={`/category/${item.attributes.slug}?key=${keyPage}`}
                                  key={index}
                                >
                                  <div className="border-l-[1px] border-r-[1px] border-t-[1px] border-[#A5A5A5] relative mt-4 overflow-hidden cursor-pointer">
                                    <Image
                                      src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                                      width={400}
                                      height={400}
                                      alt="wall"
                                      className=" w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                                    />
                                  </div>
                                  <div>
                                    <div className="w-full">
                                      <div className="bg-white">
                                        <h3 className="font-bold lucida-bright p-2 border-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-center">
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
          ) : (
            <>
              <div
                className="md:mt-20 mt-8 md:scroll-mt-[125px] scroll-mt-[190px]"
                id={data.attributes.name}
              >
                <div className="container mx-auto">
                  <div className="md:mx-10 mx-4">
                    <div className=" ">
                      <button className="lg:text-[35px] md:text-[28px] lucida-bright bg-[#10D3A2] px-4 py-1 text-white rounded-lg shadow-lg cursor-default">
                        {data.attributes.name}
                      </button>
                      <div>
                        <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                          {data.attributes.brands?.data.length &&
                            data.attributes.brands?.data
                              .sort(
                                (a, b) =>
                                  new Date(b.attributes.date).getTime() -
                                  new Date(a.attributes.date).getTime()
                              )
                              .map((item, index) => (
                                <Link
                                  href={`/category/${item.attributes.slug}?key=${keyPage}`}
                                  key={index}
                                >
                                  <div className="border-l-[1px] border-r-[1px] border-t-[1px] border-[#A5A5A5] relative mt-4 overflow-hidden cursor-pointer">
                                    <Image
                                      src={`${STRAPI_URL}${item.attributes.images.data[0].attributes.url}`}
                                      width={400}
                                      height={400}
                                      alt="wall"
                                      className=" w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                                    />
                                  </div>
                                  <div>
                                    <div className="w-full">
                                      <div className="bg-white">
                                        <h3 className="font-bold lucida-bright p-2 border-[1px] border-[#A5A5A5] lg:text-[18px] text-[10px] text-center">
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
          )}
        </>
      ) : (
        <div
          className="md:mt-20 mt-8 md:scroll-mt-[125px] scroll-mt-[190px]"
          id={data.attributes.name}
        >
          <div className="container mx-auto mt-6">
            {data.attributes?.description ? (
              <>
                <div className="md:mx-10 mx-4">
                  <div>
                    <button className="lg:text-[35px] md:text-[28px] lucida-bright cursor-default">
                      {data.attributes.name}
                    </button>
                    <div className="md:w-[350px] w-[150px] h-[3.5px] bg-[#10D3A2]"></div>
                    <p
                      className={`md:text-base text-[10px] ${cx(
                        poppins,
                        poppins.className
                      )}`}
                    >
                      {data.attributes.description}
                    </p>
                    <div>
                      <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                        {data.attributes.brands?.data.length &&
                          data.attributes.brands?.data
                            .sort(
                              (a, b) =>
                                new Date(b.attributes.date).getTime() -
                                new Date(a.attributes.date).getTime()
                            )
                            .map((item, index) => (
                              <div key={index}>
                                <CardProduct item={item} keyPage={keyPage} />
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="md:mx-10 mx-4">
                  <div>
                    <button className="lg:text-[35px] md:text-[28px] lucida-bright bg-[#10D3A2] px-4 py-1 text-white rounded-lg shadow-lg cursor-default">
                      {data.attributes.name}
                    </button>
                    <div>
                      <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                        {data.attributes.brands?.data.length &&
                          data.attributes.brands?.data
                            .sort(
                              (a, b) =>
                                new Date(b.attributes.date).getTime() -
                                new Date(a.attributes.date).getTime()
                            )
                            .map((item, index) => (
                              <div key={index}>
                                <CardProduct item={item} keyPage={keyPage} />
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
