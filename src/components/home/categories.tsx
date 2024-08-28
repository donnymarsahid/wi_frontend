"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";

export default function Categories() {
  const wallpapers = [
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Wallpaper",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Lantai Vinyl & SPC",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Wallpanel",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Karpet & Rumput Sintetis",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Tirai Blind",
    },
    {
      url: "/assets/dummy/wallpaper-1.png",
      title: "Decking Outdoor",
    },
  ];

  const services = [
    {
      url: "/assets/dummy/service-1.svg",
      desc: "Layanan dan informasi solutif perihal interior yg sedang kamu butuhkan",
    },
    {
      url: "/assets/dummy/service-2.svg",
      desc: "Tenaga pemasangan berpengalaman dan handal",
    },
    {
      url: "/assets/dummy/service-3.svg",
      desc: "Koleksi pilihan lengkap untuk memenuhi kebutuhan dekorasi interior / eksterior",
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className="flex items-center flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Pilihan Produk Dekoratif Interior & Eksterior
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[600px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div>
                <div className="grid gap-4 md:grid-cols-3 grid-cols-2">
                  {wallpapers.map((item, index) => (
                    <div>
                      <div
                        key={index}
                        className="relative mt-4 overflow-hidden rounded-lg cursor-pointer"
                      >
                        <Image
                          src={item.url}
                          width={400}
                          height={400}
                          alt="wall"
                          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="lucida-bright mt-[-20px] relative">
                        <div className="font-semibold flex justify-center">
                          <div>
                            <h3 className="bg-white py-2 md:px-6 px-2 rounded-lg shadow-lg bg-opacity-85 lg:text-[18px] text-[10px] text-center">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`md:mt-16 mt-6 ${cx(poppins, poppins.className)}`}>
              <div className="p-4 bg-[#F5F5F5] rounded-lg border border-2 border-[#10D3A2] grid gap-3 md:grid-cols-3 grid-cols-1">
                {services.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Image
                      src={item.url}
                      width={50}
                      height={50}
                      alt="wall"
                      className="w-[40px] lg:w-[50px]"
                    />
                    <p className="ms-2 lg:text-sm text-xs font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
