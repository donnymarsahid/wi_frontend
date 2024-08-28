"use client";
import React, { ChangeEvent, useState } from "react";
import CarouselBanner from "../atoms/carouselbanner";
import Image from "next/image";
import cx from "classnames";
import { poppins } from "@/app/fonts";
import CarouselBannerPromoProduct from "../atoms/carouselbannerpromoproduct";

export default function PromoAndProduct() {
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
            <div className="flex items-start flex-col">
              <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                Promo Terkini & Product Terbaru
              </h1>
              <div className="md:h-[3px] h-[1px] lg:w-[300px] md:w-[500px] w-[300px] bg-[#20D3B6] text-center"></div>
              <div className="w-full mt-6">
                <CarouselBannerPromoProduct />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
