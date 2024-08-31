"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import Link from "next/link";

export default function Accessories() {
  const categories = [
    {
      title: "Vinyl Sticker",
      url: "/assets/dummy/accessories-1.png",
    },
    {
      title: "Vinyl Sticker",
      url: "/assets/dummy/accessories-1.png",
    },
    {
      title: "Vinyl Sticker",
      url: "/assets/dummy/accessories-1.png",
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div>
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Aksesoris
              </h1>
              <div className="md:h-[3px] h-[1px] w-[120px] bg-[#20D3B6] text-center"></div>

              <div>
                <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
                  {categories.map((item, index) => (
                    <Link href={""}>
                      <div
                        key={index}
                        className="border-l-[1px] border-r-[1px] border-t-[1px] border-[#A5A5A5] relative mt-4 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={item.url}
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
